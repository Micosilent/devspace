import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import {Post} from "../entity/Post";
import {Comment} from "../entity/Comment";
import {Notification} from "../entity/Notification";
import {catchAsync} from "../util/catchAsync";
import {AppError} from "../util/AppError";
import {AppRequest} from "../util/AppRequest";

export class PostController {
  private postRepository = AppDataSource.getRepository(Post);

  private commentRepository = AppDataSource.getRepository(Comment);

  private notificationRepository = AppDataSource.getRepository(Notification);

  private userRepository = AppDataSource.getRepository(User);

  /**
   * @swagger
   * /posts:
   *  get:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: getAllPosts
   *     summary: Get all posts
   *     responses:
   *      200:
   *        description: A list of all posts
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Post'
   */
  public getAllPosts = catchAsync(async (req: AppRequest, res, _next) => {
    const posts = await this.postRepository.find({
      relations: {
        createdBy: true,
        likedBy: true,
        comments: { createdBy: true },
      },
    });

    // Remove sensitive fields
    posts.forEach((post) => {
      post.deleteSensitiveFields();
    });
    // Remove private, non followed users
    const filteredPosts = posts.filter((post) => {
      let followStatus = false; 
      
      if(post.createdBy.followers){
        followStatus = post.createdBy.followers.some(
           (follower) => follower.id === req.user.id
        );
      }
      
      if (post.createdBy.isPrivate && !followStatus) {
        return post.createdBy.followers.some(
          (follower) => follower.id === req.user.id
        );
      }
      return true;
    });

    res.status(200).send(filteredPosts);
  });

  /**
   * @swagger
   * /posts/{id}:
   *  get:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: getPost
   *     summary: Get a post by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the post
   *         schema:
   *           type: integer
   *     responses:
   *      200:
   *        description: A post
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Post'
   *      400:
   *        description: Invalid ID
   *      404:
   *        description: No post found with that ID
   */
  public getPost = catchAsync(async (req, res, next) => {
    const { post, errorMessage } = await this.validateRequestAndGetEntities(
      req
    );

    if (errorMessage == "Invalid ID")
      return next(new AppError("Invalid ID", 400));
    if (errorMessage == "No post found with that ID") {
      return next(new AppError("No post found with that ID", 404));
    }

    // Remove sensitive fields
    post.deleteSensitiveFields();

    res.send(post);
  });

  /**
   * @swagger
   * /posts/followed:
   *  get:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: getFollowedPosts
   *     summary: Get posts of followed users
   *     responses:
   *      200:
   *        description: A list of posts
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Post'
   */

  public getFollowedPosts = catchAsync(async (req: AppRequest, res, _next) => {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
      relations: {
        followed: true,
        posts: { likedBy: true, comments: true },
      },
    });

    const followedPosts = user.followed
      .map((followedUser) => followedUser.posts)
      .flat();

    // Remove sensitive fields
    followedPosts.forEach((post) => {
      post.deleteSensitiveFields();
    });

    res.send(followedPosts);
  });

  /**
   * @swagger
   * /posts:
   *  post:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: createPost
   *     summary: Create a post
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: Post title
   *               content:
   *                 type: string
   *                 description: Post content
   *     responses:
   *      201:
   *        description: A post
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Post'
   *      400:
   *        description: Title and content are required
   */

  public createPost = catchAsync(async (req: AppRequest, res, next) => {
    const user = await this.userRepository.findOne({
      where: { id: req.user.id },
    });
    const { title, content } = req.body;

    if (!title || !content)
      return next(new AppError("Title and content are required", 400));

    const newPost = Object.assign(new Post(), {
      title,
      content,
      createdBy: user,
      createdAt: new Date(),
    });

    const post = await this.postRepository.save(newPost);

    // Remove sensitive fields
    post.deleteSensitiveFields();

    res.status(201).send(post);
  });

  /**
   * @swagger
   * /posts/{id}:
   *  patch:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: updatePost
   *     summary: Update a post by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the post
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 description: Post title
   *               content:
   *                 type: string
   *                 description: Post content
   *     responses:
   *      200:
   *        description: A post
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Post'
   *      400:
   *        description: Invalid ID or Title and content are required
   *      404:
   *        description: No post found with that ID
   */

  public updatePost = catchAsync(async (req: AppRequest, res, next) => {
    const { user, post, errorMessage } =
      await this.validateRequestAndGetEntities(req);
    const { title, content } = req.body;

    if (!title || !content)
      return next(new AppError("Title and content are required", 400));

    if (errorMessage == "Invalid ID")
      return next(new AppError("Invalid ID", 400));
    if (errorMessage == "No post found with that ID") {
      return next(new AppError("No post found with that ID", 404));
    }

    if (post.createdBy.id !== user.id) {
      return next(
        new AppError("You are not authorized to update this post", 403)
      );
    }

    post.title = title;
    post.content = content;
    await this.postRepository.save(post);

    // Remove sensitive fields
    post.deleteSensitiveFields();

    res.status(200).send(post);
  });

  /**
   * @swagger
   * /posts/{id}:
   *  delete:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: deletePost
   *     summary: Delete a post by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the post
   *         schema:
   *           type: integer
   *     responses:
   *      204:
   *        description: No content
   *      400:
   *        description: Invalid ID
   *      404:
   *        description: No post found with that ID
   */

  public deletePost = catchAsync(async (req: AppRequest, res, next) => {
    const { user, post, errorMessage } =
      await this.validateRequestAndGetEntities(req);

    if (errorMessage == "Invalid ID")
      return next(new AppError("Invalid ID", 400));
    if (errorMessage == "No post found with that ID")
      return next(new AppError("No post found with that ID", 404));

    if (post.createdBy.id !== user.id) {
      return next(
        new AppError("You are not authorized to delete this post", 403)
      );
    }

    await this.postRepository.remove(post);
    res.status(204).send();
  });

  /**
   * @swagger
   * /posts/{id}/like:
   *  post:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: likePost
   *     summary: Like a post by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the post
   *         schema:
   *           type: integer
   *     responses:
   *      200:
   *        description: A post
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Post'
   *      400:
   *        description: Invalid ID or You have already liked this post
   *      404:
   *        description: No post found with that ID
   */

  public likePost = catchAsync(async (req: AppRequest, res, next) => {
    const { user, post, errorMessage } =
      await this.validateRequestAndGetEntities(req);

    if (errorMessage == "Invalid ID")
      return next(new AppError("Invalid ID", 400));
    if (errorMessage == "No post found with that ID") {
      return next(new AppError("No post found with that ID", 404));
    }

    // Check if user has already liked the post
    if (post.likedBy.some((likedUser) => likedUser.id === user.id)) {
      return next(new AppError("You have already liked this post", 400));
    }

    post.likedBy.push(user);
    await this.postRepository.save(post);

    // Send notification to post creator
    const newNotification = Object.assign(new Notification(), {
      message: `${user.firstName} ${user.lastName} liked your post`,
      belongsTo: post.createdBy,
      timeStamp: new Date(),
    });
    const notification = await this.notificationRepository.save(
      newNotification
    );
    post.createdBy.notifications.push(notification);
    await this.userRepository.save(post.createdBy);

    // Remove sensitive fields
    post.deleteSensitiveFields();

    res.status(200).send(post);
  });

  /**
   * @swagger
   * /posts/{id}/like:
   *  delete:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: unlikePost
   *     summary: Unlike a post by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the post
   *         schema:
   *           type: integer
   *     responses:
   *      200:
   *        description: A post
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Post'
   *      400:
   *        description: Invalid ID or You have not liked this post
   *      404:
   *        description: No post found with that ID
   */

  public unlikePost = catchAsync(async (req: AppRequest, res, next) => {
    const { user, post, errorMessage } =
      await this.validateRequestAndGetEntities(req);

    if (errorMessage == "Invalid ID")
      return next(new AppError("Invalid ID", 400));
    if (errorMessage == "No post found with that ID")
      return next(new AppError("No post found with that ID", 404));

    // Check if user likes the post
    if (!post.likedBy.some((likedUser) => likedUser.id === user.id)) {
      return next(new AppError("You have not liked this post", 400));
    }

    post.likedBy = post.likedBy.filter((likedUser) => likedUser.id !== user.id);
    await this.postRepository.save(post);

    // Remove sensitive fields
    post.deleteSensitiveFields();

    res.status(200).send(post);
  });

  /**
   * @swagger
   * /posts/{id}/comment:
   *  post:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Posts
   *     operationId: commentPost
   *     summary: Comment on a post by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the post
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               content:
   *                 type: string
   *                 description: Comment content
   *     responses:
   *      201:
   *        description: A comment
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Comment'
   *      400:
   *        description: Invalid Request
   *      404:
   *        description: No post found with that ID
   */

  public commentPost = catchAsync(async (req: AppRequest, res, next) => {
    const { user, post, errorMessage } =
      await this.validateRequestAndGetEntities(req);

    if (errorMessage == "Invalid ID")
      return next(new AppError("Invalid ID", 400));
    if (errorMessage == "No post found with that ID") {
      return next(new AppError("No post found with that ID", 404));
    }

    const { content } = req.body;
    const newComment = Object.assign(new Comment(), {
      content,
      createdBy: user,
      post,
      createdAt: new Date(),
    });

    const comment = await this.commentRepository.save(newComment);

    // Send notification to post creator
    const newNotification = Object.assign(new Notification(), {
      message: `${user.firstName} ${user.lastName} commented on your post`,
      belongsTo: post.createdBy,
      timeStamp: new Date(),
    });
    await this.notificationRepository.save(newNotification);

    // Remove sensitive fields
    comment.createdBy.deleteSensitiveFields();
    post.deleteSensitiveFields();

    res.status(201).send(comment);
  });

  private validateRequestAndGetEntities = async (
    req: AppRequest
  ): Promise<validatedEntities> => {
    const postId = req.params.id;
    const parsedId = parseInt(postId);
    let errorMessage: "Invalid ID" | "No post found with that ID";

    // Check if ID is a number
    if (isNaN(parsedId)) errorMessage = "Invalid ID";

    const user = req.user;
    const post = await this.postRepository.findOne({
      where: { id: parsedId },
      relations: {
        likedBy: true,
        comments: { createdBy: true },
        createdBy: { notifications: true },
      },
    });

    // Check if post exists
    if (!post) errorMessage = "No post found with that ID";

    return { user, post, errorMessage };
  };
}
interface validatedEntities {
    user: User
    post: Post
    errorMessage?: 'Invalid ID' | 'No post found with that ID'
}
