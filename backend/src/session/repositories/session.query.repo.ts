import {InjectModel} from "@nestjs/mongoose";

import {Model} from "mongoose";
import {Session, SessionDocument} from "../entities/session.schema";


export class SessionQueryRepo {
    constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {
    }

    async findOne(id: string) {
        return this.sessionModel.findOne({id}).exec();
    }
}