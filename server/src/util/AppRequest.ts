import { Request } from 'express';
import {User} from "../entity/User";

export interface AppRequest extends Request {
    user?: User
}