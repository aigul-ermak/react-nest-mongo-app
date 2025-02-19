import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Post, PostDocument} from "../entities/post.schema";


export class PostQueryRepo {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {
    }

    async getAllPosts(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const posts = await this.postModel.find()
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.postModel.countDocuments();

        return {
            posts,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string) {
        const result = await this.postModel.findById(id).exec();
        return result;
    }
}