import {InjectModel} from "@nestjs/mongoose";
import {Session} from "@nestjs/common";
import {Model} from "mongoose";
import {SessionDocument} from "../entities/session.schema";


export class SessionQueryRepo {
    constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {
    }

}