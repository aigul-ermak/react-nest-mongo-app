import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../entities/user.entity";
import {UserDocument} from "../entities/user.schema";
import {CreateUserDto} from "../dto/create-user.dto";


export class UserRepo {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async create(user: CreateUserDto): Promise<string> {
        const newUser = new this.userModel({...user});
        const savedUser = await newUser.save();
        return savedUser._id.toString();
    }
}