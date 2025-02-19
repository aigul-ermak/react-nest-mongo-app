import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../entities/user.schema";
import {CreateUserDto} from "../dto/create-user.dto";


export class UserRepo {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async create(user: CreateUserDto): Promise<string> {
        const newUser = new this.userModel({...user});
        const savedUser = await newUser.save();
        return savedUser._id.toString();
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        return result !== null;
    }
}