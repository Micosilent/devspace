import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable} from "typeorm"
import * as bcrypt from "bcrypt"
import {Post} from "./Post";
import {Comment} from "./Comment";
import {Notification} from "./Notification";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: null })
  profilePictureId: string;

  @ManyToMany((type) => User)
  @JoinTable()
  followed: User[];

  @ManyToMany((type) => User)
  @JoinTable()
  followers: User[];

  @OneToMany((type) => Post, (post) => post.createdBy)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.createdBy)
  comments: Comment[];

  @OneToMany((type) => Notification, (notification) => notification.belongsTo)
  notifications: Notification[];

  static async hashPassword(password: string) {
    return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  public deleteSensitiveFields() {
    delete this.password;
    delete this.email;
    delete this.notifications;
    delete this.followed;
    delete this.followers;
  }
}
