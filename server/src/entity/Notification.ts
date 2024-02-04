import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Notification {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @Column()
    timeStamp: Date

    @Column({default: false})
    seen: boolean

    @ManyToOne(type => User, user => user.notifications)
    belongsTo: User
}