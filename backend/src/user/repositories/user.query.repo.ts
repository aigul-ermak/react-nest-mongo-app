import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../entities/user.schema";
import {UserMapper} from "../dto/mapper/user.mapper";
import {UserLoginMapper} from "../dto/mapper/user-login.mapper";

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

    async findOneByLoginOrEmail(loginOrEmail: string) {
        const user = await this.userModel.findOne({
            $or:
                [
                    {'login': loginOrEmail},
                    {'email': loginOrEmail}
                ]
        })

        if (!user) {
            return null;
        }

        return UserLoginMapper(user as UserDocument);
    }

}