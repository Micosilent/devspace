import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Comment} from "./entity/Comment";
import {Post} from "./entity/Post";
import {Notification} from "./entity/Notification";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "db",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Comment, Post, Notification],
    migrations: [],
    subscribers: [],
})
