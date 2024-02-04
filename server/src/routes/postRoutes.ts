import {PostController} from "../controller/postController";
import {Router} from "express";

const postController = new PostController()

export const PostRoutes = Router();

PostRoutes.route("/")
    .get(postController.getAllPosts)
    .post(postController.createPost)
PostRoutes.route("/followed").get(postController.getFollowedPosts)
PostRoutes.route("/:id")
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost)
PostRoutes.route("/:id/like")
    .post(postController.likePost)
    .delete(postController.unlikePost)
PostRoutes.route("/:id/comment").post(postController.commentPost)