import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import {AppError} from "../util/AppError";
import {AppRequest} from "../util/AppRequest";
import {Notification} from "../entity/Notification";
import {catchAsync} from "../util/catchAsync";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  private notificationRepository = AppDataSource.getRepository(Notification);
  /**
   * @swagger
   * /users:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Users
   *    summary: Get all users
   *    responses:
   *      200:
   *        description: A list of all users
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/User'
   */
  public getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.userRepository.find();

      // remove sensitive fields
      users.forEach((user) => {
        user.deleteSensitiveFields();
      });

      // remove the users set to private
      const publicUsers = users.filter((user) => user.isPrivate === false);

      res.status(200).send(publicUsers);
    }
  );

  /**
   * @swagger
   * /users/{id}:
   *  get:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Users
   *    summary: Get a single user
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        description: ID of the user
   *        schema:
   *          type: integer
   *    responses:
   *      200:
   *        description: A single user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserWithRelations'
   */
  public getUser = catchAsync(
    async (req: AppRequest, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const parsedId = parseInt(id);
      // Check if ID is a number
      if (isNaN(parsedId)) return next(new AppError("Invalid ID", 400));

      const user = await this.userRepository.findOne({
        where: { id: parsedId },
        relations: {
          followed: true,
          followers: true,
          posts: { likedBy: true },
          comments: true,
        },
      });

      if (!user) return next(new AppError("No user found with that ID", 404));

      // remove sensitive fields
      user.deletePrivateFields();
      if (user.posts) {
        user.posts.forEach((post) => {
          if (post.likedBy) {
            post.likedBy.forEach((user) => user.deleteSensitiveFields());
          }
          if (post.comments) {
            post.comments.forEach((comment) =>
              comment.createdBy.deleteSensitiveFields()
            );
          }
        });
      }
      if (user.followed) {
        user.followed.forEach((followedUser) =>
          followedUser.deleteSensitiveFields()
        );
      }
      let followStatus = false;
      if (user.followers) {
        user.followers.forEach((follower) => follower.deleteSensitiveFields());
        // Set the followed status of the user
        followStatus = user.followers.some(
          (follower) => follower.id === req.user.id
        );
      }

      // If the user is private, only return the user
      // if the requesting user is following

      if (user.isPrivate && !followStatus) {
        user.followed = [];
        user.followers = [];
        user.posts = [];
        user.comments = [];
      }

      return res.send(user);
    }
  );

  /**
   * @swagger
   * /users/me:
   *  get:
   *    tags:
   *      - Users
   *    summary: Get the currently logged in user
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      200:
   *        description: The currently logged in user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserWithRelationsAndNotifications'
   */
  public getMe = catchAsync(
    async (req: AppRequest, res: Response, next: NextFunction) => {
      const user = await this.userRepository.findOne({
        where: { id: req.user.id },
        relations: {
          followed: true,
          followers: true,
          posts: true,
          comments: true,
          notifications: true,
        },
      });

      user.followed.forEach((followedUser) =>
        followedUser.deleteSensitiveFields()
      );
      user.followers.forEach((follower) => follower.deleteSensitiveFields());

      return res.status(200).send(user);
    }
  );

  /**
   * @swagger
   * /users/me:
   *  patch:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Users
   *    summary: Update the currently logged in user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              isPrivate:
   *                type: boolean
   *                description: Whether the user's account is private
   *              profilePictureId:
   *                type: string
   *                description: The ID of the user's profile picture
   *    responses:
   *      200:
   *        description: Successfully updated the user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserWithRelationsAndNotifications'
   *      400:
   *        description: Invalid request body
   */
  public updateMe = catchAsync(
    async (req: AppRequest, res: Response, next: NextFunction) => {
      const user = await this.userRepository.findOne({
        where: { id: req.user.id },
        relations: {
          followed: true,
          followers: true,
          posts: true,
          comments: true,
          notifications: true,
        },
      });

      user.isPrivate = req.body.isPrivate || user.isPrivate;
      user.profilePictureId =
        req.body.profilePictureId || user.profilePictureId;
      await this.userRepository.save(user);

      return res.status(200).send(user);
    }
  );

  /**
   * @swagger
   * /users/follow/{id}:
   *  post:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Users
   *    summary: Follow a user
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *          description: The ID of the user to follow
   *    responses:
   *      200:
   *        description: Successfully followed the user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserWithRelations'
   *      400:
   *        description: Invalid ID
   *      404:
   *        description: No user found with that ID
   */
  public followUser = catchAsync(
    async (req: AppRequest, res: Response, next: NextFunction) => {
      const userToFollowId = req.params.id;
      const parsedId = parseInt(userToFollowId);
      // Check if ID is a number
      if (isNaN(parsedId)) return next(new AppError("Invalid ID", 400));

      const user = req.user;
      const userToFollow = await this.userRepository.findOne({
        where: { id: parsedId },
        relations: { followed: true, followers: true, notifications: true },
      });

      if (!userToFollow)
        return next(new AppError("No user found with that ID", 404));

      // Check if user is already following
      if (
        user.followed.some(
          (followedUser) => followedUser.id === userToFollow.id
        )
      ) {
        return next(new AppError("You are already following this user", 400));
      }
      // Follow the user
      user.followed.push(userToFollow);
      await this.userRepository.save(user);
      // Add the requesting user to the followers of the user being followed
      userToFollow.followers.push(user);
      // Create a notification for the user being followed
      const followNotification = Object.assign(new Notification(), {
        seen: false,
        message: `${user.firstName} is now following you`,
        timeStamp: new Date(),
      });
      userToFollow.notifications.push(
        await this.notificationRepository.save(followNotification)
      );
      await this.userRepository.save(userToFollow);

      return res.status(200).send({
        status: "success",
        message: `You are now following ${userToFollow.firstName}`,
      });
    }
  );

  /**
   * @swagger
   * /users/follow/{id}:
   *  delete:
   *    security:
   *      - bearerAuth: []
   *    tags:
   *      - Users
   *    summary: Unfollow a user
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: integer
   *          description: The ID of the user to unfollow
   *    responses:
   *      200:
   *        description: Successfully unfollowed the user
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserWithRelations'
   *      400:
   *        description: Invalid ID
   *      404:
   *        description: No user found with that ID
   */
  public unfollowUser = catchAsync(
    async (req: AppRequest, res: Response, next: NextFunction) => {
      const userToUnfollowId = req.params.id;
      const parsedId = parseInt(userToUnfollowId);
      // Check if ID is a number
      if (isNaN(parsedId)) return next(new AppError("Invalid ID", 400));

      const user = req.user;
      const userToUnfollow = await this.userRepository.findOne({
        where: { id: parsedId },
        relations: { followed: true, followers: true },
      });

      if (!userToUnfollow)
        return next(new AppError("No user found with that ID", 404));
      // Check if user is following
      if (
        !user.followed.some(
          (followedUser) => followedUser.id === userToUnfollow.id
        )
      ) {
        return next(new AppError("You are not following this user", 400));
      }
      // Unfollow the user
      user.followed = user.followed.filter(
        (followedUser) => followedUser.id !== userToUnfollow.id
      );
      await this.userRepository.save(user);

      userToUnfollow.followers = userToUnfollow.followers.filter(
        (follower) => follower.id !== user.id
      );
      await this.userRepository.save(userToUnfollow);

      return res.status(200).send({
        status: "success",
        message: `You are no longer following ${userToUnfollow.firstName}`,
      });
    }
  );
}