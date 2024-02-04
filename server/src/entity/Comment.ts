import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Post} from "./Post";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    createdAt: Date

    @ManyToOne(() => User, user => user.comments)
    createdBy: User

    @ManyToOne(() => Post, post => post.comments)
    post: Post

    @ManyToMany(()=> User)
    @JoinTable()
    likedBy: User[]

}
