import {Router} from "express";
import {UserController} from "../controller/UserController";

export const UserRoutes = Router();

const userController = new UserController()

UserRoutes.route("/").get(userController.getAllUsers)
UserRoutes.route("/me").get(userController.getMe)
UserRoutes.route("/:id").get(userController.getUser)
UserRoutes.route("/follow/:id").post(userController.followUser)
UserRoutes.route("/unfollow/:id").post(userController.unfollowUser)