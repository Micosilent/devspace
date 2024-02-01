import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable} from "typeorm"
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
}
