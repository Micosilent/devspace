import {Router} from "express";
import {AuthController} from "../controller/authController";

const authController = new AuthController()
export const AuthRoutes = Router();


AuthRoutes.route("/signup").post(authController.handleSignUp)
AuthRoutes.route("/login").post(authController.handleLogin)




