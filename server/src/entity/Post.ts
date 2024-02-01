import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    createdAt: Date

    @ManyToOne(() => User, user => user.posts)
    createdBy: User

    @ManyToMany(()=> User)
    @JoinTable()
    likedBy: User[]

}