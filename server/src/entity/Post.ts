import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Comment} from "./Comment";

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

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]

    @ManyToMany(()=> User)
    @JoinTable()
    likedBy: User[]

    public deleteSensitiveFields(){
        this.createdBy.deleteSensitiveFields()
        if(this.likedBy){
            this.likedBy.forEach(user => user.deleteSensitiveFields())
        }
        if(this.comments){
            this.comments.forEach(comment => comment.createdBy.deleteSensitiveFields())
        }

    }

}