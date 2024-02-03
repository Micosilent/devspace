import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import {AppError} from "../util/AppError";
import {AppRequest} from "../util/AppRequest";
import {Notification} from "../entity/Notification";
import {catchAsync} from "../util/catchAsync";

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    private notificationRepository = AppDataSource.getRepository(Notification)
    public getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.userRepository.find()

        // remove sensitive fields
        users.forEach(user => {
            user.deleteSensitiveFields()
        })

        res.status(200).send(users)
    })

    public getUser = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id
        const parsedId = parseInt(id)
        // Check if ID is a number
        if(isNaN(parsedId)) return next(new AppError('Invalid ID', 400))

        const user = await this.userRepository.findOne({where: {id: parsedId}, relations:{
                followed: true,
                followers: true,
                posts: true,
                comments: true,
            }})


        if(!user) return next(new AppError('No user found with that ID', 404))

        // remove sensitive fields
        user.deleteSensitiveFields()
        user.followed.forEach(followedUser => followedUser.deleteSensitiveFields())
        user.followers.forEach(follower => follower.deleteSensitiveFields())

        return res.send(user)
    })

    public getMe = catchAsync(async (req: AppRequest, res: Response, next: NextFunction) => {
        const user = await this.userRepository.findOne({
            where: {id: req.user.id},
            relations:{
                followed: true,
                followers: true,
                posts: true,
                comments: true,
            }
        })

        user.followed.forEach(followedUser => followedUser.deleteSensitiveFields())
        user.followers.forEach(follower => follower.deleteSensitiveFields())

        return res.status(200).send(user)
    })

    public followUser = catchAsync(async (req: AppRequest, res: Response, next: NextFunction) => {
        const userToFollowId = req.params.id
        const parsedId = parseInt(userToFollowId)
        // Check if ID is a number
        if(isNaN(parsedId)) return next(new AppError('Invalid ID', 400))

        const user = req.user
        const userToFollow = await this.userRepository.findOne({
            where: {id: parsedId},
            relations:{followed: true, followers: true, notifications: true}}
        )

        if(!userToFollow) return next(new AppError('No user found with that ID', 404))

        // Check if user is already following
        if(user.followed.some(followedUser => followedUser.id === userToFollow.id)){
            return next(new AppError('You are already following this user', 400))
        }
        // Follow the user
        user.followed.push(userToFollow)
        await this.userRepository.save(user)
        // Add the requesting user to the followers of the user being followed
        userToFollow.followers.push(user)
        // Create a notification for the user being followed
        const followNotification = Object.assign(new Notification(),{
            seen: false,
            message: `${user.firstName} is now following you`,
            timeStamp: new Date()
        })
        userToFollow.notifications.push(
            await this.notificationRepository.save(followNotification)
        )
        await this.userRepository.save(userToFollow)


        return res.status(200).send({
            status: 'success',
            message: `You are now following ${userToFollow.firstName}`
        })
    })

    public unfollowUser = catchAsync(async (req: AppRequest, res: Response, next: NextFunction) => {
        const userToUnfollowId = req.params.id
        const parsedId = parseInt(userToUnfollowId)
        // Check if ID is a number
        if(isNaN(parsedId)) return next(new AppError('Invalid ID', 400))

        const user = req.user
        const userToUnfollow = await this.userRepository.findOne({
            where: {id: parsedId},
            relations: {followed: true, followers: true}
        })

        if(!userToUnfollow) return next(new AppError('No user found with that ID', 404))
        // Check if user is following
        if(!user.followed.some(followedUser => followedUser.id === userToUnfollow.id)){
            return next(new AppError('You are not following this user', 400))
        }
        // Unfollow the user
        user.followed = user.followed.filter(followedUser => followedUser.id !== userToUnfollow.id)
        await this.userRepository.save(user)

        userToUnfollow.followers = userToUnfollow.followers.filter(follower => follower.id !== user.id)
        await this.userRepository.save(userToUnfollow)

        return res.status(200).send({
            status: 'success',
            message: `You are no longer following ${userToUnfollow.firstName}`
        })
    })

}