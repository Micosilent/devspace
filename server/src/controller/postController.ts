import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import {Post} from "../entity/Post";
import {Comment} from "../entity/Comment";
import {Notification} from "../entity/Notification";
import {catchAsync} from "../util/catchAsync";
import {AppError} from "../util/AppError";
import {AppRequest} from "../util/AppRequest";

export class PostController {
    private postRepository = AppDataSource.getRepository(Post)

    private commentRepository = AppDataSource.getRepository(Comment)

    private notificationRepository = AppDataSource.getRepository(Notification)

    private userRepository = AppDataSource.getRepository(User)

    public getAllPosts = catchAsync(async (_req, res, _next) => {
        const posts = await this.postRepository.find({relations: {createdBy: true}})

        // Remove sensitive fields
        posts.forEach(post => {
            post.deleteSensitiveFields()
        })

        res.status(200).send(posts)
    })

    public getPost = catchAsync(async (req, res, next) => {
       const { post, errorMessage} =
           await this.validateRequestAndGetEntities(req)

        if(errorMessage == 'Invalid ID') return next(new AppError('Invalid ID', 400))
        if(errorMessage == 'No post found with that ID'){
            return next(new AppError('No post found with that ID', 404))
        }

        // Remove sensitive fields
        post.deleteSensitiveFields()

        res.send(post)
    })

    public getFollowedPosts = catchAsync(async (req : AppRequest, res, _next) => {
        const user = await this.userRepository.findOne({
            where: {id: req.user.id},
            relations: {followed: true, posts: true}})

        const followedPosts = user.followed.map(followedUser => followedUser.posts).flat()

        // Remove sensitive fields
        followedPosts.forEach(post => {
            post.deleteSensitiveFields()
        })

        res.send(followedPosts)
    })

    public createPost = catchAsync(async (req : AppRequest, res, next) => {
        const user = await this.userRepository.findOne({where: {id: req.user.id}})
        const {title, content} = req.body

        if(!title || !content) return next(new AppError('Title and content are required', 400))


        const newPost = Object.assign(new Post(), {
            title,
            content,
            createdBy: user,
            createdAt: new Date()})

        const post = await this.postRepository.save(newPost)

        // Remove sensitive fields
        post.deleteSensitiveFields()

        res.status(201).send(post)
    })

    public updatePost = catchAsync(async (req : AppRequest, res, next) => {
        const {user, post, errorMessage} = await this.validateRequestAndGetEntities(req)
        const {title, content} = req.body

        if(!title || !content) return next(new AppError('Title and content are required', 400))

        if(errorMessage == 'Invalid ID') return next(new AppError('Invalid ID', 400))
        if(errorMessage == 'No post found with that ID'){
            return next(new AppError('No post found with that ID', 404))
        }

        if(post.createdBy.id !== user.id){
            return next(new AppError('You are not authorized to update this post', 403))
        }

        post.title = title
        post.content = content
        await this.postRepository.save(post)

        // Remove sensitive fields
        post.deleteSensitiveFields()

        res.status(200).send(post)
    })

    public deletePost = catchAsync(async (req : AppRequest, res, next) => {
        const {user, post, errorMessage} = await this.validateRequestAndGetEntities(req)

        if(errorMessage == 'Invalid ID') return next(new AppError('Invalid ID', 400))
        if(errorMessage == 'No post found with that ID') return next(new AppError('No post found with that ID', 404))

        if(post.createdBy.id !== user.id){
            return next(new AppError('You are not authorized to delete this post', 403))
        }

        await this.postRepository.remove(post)
        res.status(204).send()
    })

    public likePost = catchAsync(async (req : AppRequest, res, next) => {
        const {user, post, errorMessage} = await this.validateRequestAndGetEntities(req)

        if(errorMessage == 'Invalid ID') return next(new AppError('Invalid ID', 400))
        if(errorMessage == 'No post found with that ID'){
            return next(new AppError('No post found with that ID', 404))
        }

        // Check if user has already liked the post
        if(post.likedBy.some(likedUser => likedUser.id === user.id)){
            return next(new AppError('You have already liked this post', 400))
        }

        post.likedBy.push(user)
        await this.postRepository.save(post)

        // Send notification to post creator
        const newNotification = Object.assign(new Notification(),{
            message: `${user.firstName} ${user.lastName} liked your post`,
            belongsTo: post.createdBy,
            timeStamp: new Date()
        })
        const notification = await this.notificationRepository.save(newNotification)
        post.createdBy.notifications.push(notification)
        await this.userRepository.save(post.createdBy)

        // Remove sensitive fields
        post.deleteSensitiveFields()

        res.status(200).send(post)
    })

    public unlikePost = catchAsync(async (req : AppRequest, res, next) => {
        const {user, post, errorMessage} = await this.validateRequestAndGetEntities(req)

        if(errorMessage == 'Invalid ID') return next(new AppError('Invalid ID', 400))
        if(errorMessage == 'No post found with that ID') return next(new AppError('No post found with that ID', 404))

        // Check if user likes the post
        if(!post.likedBy.some(likedUser => likedUser.id === user.id)){
            return next(new AppError('You have not liked this post', 400))
        }

        post.likedBy = post.likedBy.filter(likedUser => likedUser.id !== user.id)
        await this.postRepository.save(post)

        // Remove sensitive fields
        post.deleteSensitiveFields()

        res.status(200).send(post)
    })

    public commentPost = catchAsync(async (req : AppRequest, res, next) => {
        const {user, post, errorMessage} = await this.validateRequestAndGetEntities(req)

        if(errorMessage == 'Invalid ID') return next(new AppError('Invalid ID', 400))
        if(errorMessage == 'No post found with that ID') {
            return next(new AppError('No post found with that ID', 404))
        }

        const {content} = req.body
        const newComment = Object.assign(new Comment(), {
            content,
            createdBy: user,
            post,
            createdAt: new Date()
        })

        const comment = await this.commentRepository.save(newComment)

        // Send notification to post creator
        const newNotification = Object.assign(new Notification(),{
            message: `${user.firstName} ${user.lastName} commented on your post`,
            belongsTo: post.createdBy,
            timeStamp: new Date()
        })
        await this.notificationRepository.save(newNotification)

        // Remove sensitive fields
        comment.createdBy.deleteSensitiveFields()
        post.deleteSensitiveFields()

        res.status(201).send(comment)
    })


    private validateRequestAndGetEntities = async (req : AppRequest,) : Promise<validatedEntities> => {
        const postId = req.params.id
        const parsedId = parseInt(postId)
        let errorMessage: 'Invalid ID' | 'No post found with that ID'

        // Check if ID is a number
        if(isNaN(parsedId)) errorMessage = 'Invalid ID'

        const user = req.user
        const post = await this.postRepository.findOne({
            where: {id: parsedId},
            relations: {
                likedBy: true,
                comments: { createdBy: true },
                createdBy: {notifications: true}
            }
        })

        // Check if post exists
        if(!post) errorMessage = 'No post found with that ID'

        return {user, post, errorMessage}

    }
}
interface validatedEntities {
    user: User
    post: Post
    errorMessage?: 'Invalid ID' | 'No post found with that ID'
}
