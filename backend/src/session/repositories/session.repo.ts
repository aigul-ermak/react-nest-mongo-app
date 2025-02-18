import {InjectModel} from "@nestjs/mongoose";

import {Model} from "mongoose";
import {Session, SessionDocument} from "../entities/session.schema";

export class SessionRepo {
    constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {
    }

    async create(sessionUser) {
        const result = await this.sessionModel.create(sessionUser);

        return result._id.toString();
    }

    async delete(id: string) {
        const result = await this.sessionModel.deleteOne({id});

        return result.deletedCount === 1;
    }

}