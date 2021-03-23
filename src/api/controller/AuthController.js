    /**
     * Created by trungquandev.com's author on 16/10/2019.
     * src/controllers/auth.js
     */
    import { generateToken, verifyToken } from "../helper/jwt.helper";
    import {read_user,create} from "../service/note_ser";
    import bcrypt from 'bcrypt';
    const debug = console.log.bind(console);
    
    // Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
    // Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
    let tokenList = {};
    
    // Thời gian sống của token
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
    // Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";
    
    // Thời gian sống của refreshToken
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
    // Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-trungquandev.com-green-cat-a@";
    
    /**
     * controller login
     * @param {*} req 
     * @param {*} res 
     */
export let login = async (req, res) => {
    try {
        debug(`Đang giả lập hành động đăng nhập thành công với password: ${req.body.password} và name: ${req.body.name}`);
        const userData = {
        user_id:0,
        user_name: req.body.name,
        user_password: req.body.password
        };

        const result = await read_user(req.body.name).then((res)=>{
            return res;
        }).catch((err)=>{
            debug(err);
        });

        const res1 = result[0];
        if(res1==null){
            return res.status(500).json({message:"Username doesn't exist"});
        }

        const isPasswordMatch  = await bcrypt.compare(req.body.password,res1.user_password);
        
        if(!isPasswordMatch){
            return res.status(500).json({message:"Wrong password"});
        }

        debug("Compare");
        userData.user_name = res1.user_name;
        userData.user_password = req.body.password;
        userData.user_id = res1.user_id;

        debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]`);
        const accessToken = await generateToken(userData, accessTokenSecret, accessTokenLife);
        
        debug('Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] ');
        const refreshToken = await generateToken(userData, refreshTokenSecret, refreshTokenLife);
    
        tokenList[refreshToken] = {accessToken, refreshToken};
        
        debug(`Gửi Token và Refresh Token về cho client...`);
        return res.status(200).json({accessToken, refreshToken});
    } catch (error) {
        return res.status(500).json({message:"error"});
    }
}

export let register = async (req,res)=>{
    try{
        const res1 = await create(req.body.name,req.body.password).then(res=>{
            return res;
        })

        if(res1!=-1){
            return res.status(201).json({message:"Create User success"});
        }
        else{
            return res.status(500).json({message:"User has exits!"});
        }

    } catch(err){
        debug(err);
    }
}
    
    /**
     * controller refreshToken
     * @param {*} req 
     * @param {*} res 
     */
export   let refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);
    
    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
        const decoded = await verifyToken(refreshTokenFromClient, refreshTokenSecret);
    
        // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
        // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
        // debug("decoded: ", decoded);
        const userFakeData = decoded.data;
    
        debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
        const accessToken = await generateToken(userFakeData, accessTokenSecret, accessTokenLife);
    
        // gửi token mới về cho người dùng
        return res.status(200).json({accessToken});
        } catch (error) {
        // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
        debug(error);
    
        res.status(403).json({
            message: 'Invalid refresh token.',
        });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
        message: 'No token provided.',
        });
    }
    };
