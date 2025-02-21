import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Post, PostDocument} from "../entities/post.schema";
import {PostMapper} from "../dto/mapper/post.mapper";


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

        const mappedPosts = posts.map(post => PostMapper(post));

        return {
            post: mappedPosts,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string) {
        return this.postModel.findOne({ _id: id });
    }

    async countPostsByBlogId(blogId: string): Promise<number> {
        return await this.postModel.countDocuments({ blogId });
    }

    async findAllPostsPaginated(blogId: string, skip: number, limit: number) {
        const posts = await this.postModel
            .find({ blogId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const mappedPosts = posts.map(post => ({
            ...PostMapper(post),
        }));

        return mappedPosts;

    }

}