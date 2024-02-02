import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable} from "typeorm"
import * as bcrypt from "bcrypt"
import {Post} from "./Post";
import {Comment} from "./Comment";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @ManyToMany(type => User)
    @JoinTable()
    followed: User[]

    @OneToMany(type => Post, post=> post.createdBy)
    posts: Post[]

    @OneToMany(type => Comment, comment=> comment.createdBy)
    comments: Comment[]


    static async hashPassword(password: string){
        return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    }

    async comparePassword(password: string){
        return await bcrypt.compare(password, this.password)
    }
}
