import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../entities/user.entity";
import {UserDocument} from "../entities/user.schema";
import {UserMapper} from "../dto/mapper/user.mapper";


export class UserQueryRepo {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({email}).exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id).exec();

        if (!user) {
            return null;
        }

        return UserMapper(user);
    }

}