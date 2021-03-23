    /**
     * Created by trungquandev.com's author on 16/10/2019.
     * src/controllers/auth.js
     */
    import { sign, verify } from "jsonwebtoken";

    /**
     * private function generateToken
     * @param user 
     * @param secretSignature 
     * @param tokenLife 
     */
 export   let generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
        const userData = {
        user_id: user.user_id,
        user_name: user.user_name,
        user_password: user.user_password
        }
        // Thực hiện ký và tạo token
        sign(
        {data: userData},
        secretSignature,
        {
            algorithm: "HS256",
            expiresIn: tokenLife,
        },
        (error, token) => {
            if (error) {
            return reject(error);
            }
            resolve(token);
        });
    });
    }
    
    /**
     * This module used for verify jwt token
     * @param {*} token 
     * @param {*} secretKey 
     */
export    let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        verify(token, secretKey, (error, decoded) => {
        if (error) {
            return reject(error);
        }
        resolve(decoded);
        });
    });
    }
