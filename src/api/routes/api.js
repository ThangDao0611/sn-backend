/**
 * Created by trungquandev.com's author on 16/10/2019.
 * src/routes/api.js
 */
import { Router } from "express";
const router = Router();
import { isAuth } from "../middleware/AuthMiddleware";
import { login, refreshToken,register } from "../controller/AuthController";
import { user } from "../controller/UserController";
    
    /**
     * Init all APIs on your application
     * @param {*} app from express
     */
export let initAPIs = (app) => {
    router.post("/login", login);
    router.post("/refresh-token", refreshToken);
    router.post("/register",register);
        // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    router.use(isAuth);
        // List Protect APIs:
    router.get("/user", user);
        // router.get("/example-protect-api", ExampleController.someAction);
        
    return app.use("/", router);
}

export default initAPIs;