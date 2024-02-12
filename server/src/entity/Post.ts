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
        if (this.likedBy) {
          if (this.likedBy.length > 0) {
            this.likedBy.forEach((user) => user.deleteSensitiveFields());
          }
        }
        if (this.comments) {
          if (this.comments.length > 0) {
            this.comments.forEach((comment) =>
              comment.createdBy.deleteSensitiveFields()
            );
          }
        } 

    }

}