import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Post, PostDocument} from "../entities/post.schema";
import {UpdatePostDto} from "../dto/update-post.dto";


export class PostRepo {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {
    }

    async insert(post) {
        const res = await this.postModel.insertMany(post);
        return res[0];
    }

    async update(id: string, updatePostDto: UpdatePostDto) {
        const updatedPost = await this.postModel.findByIdAndUpdate(
            id,
            {$set: updatePostDto},
            {new: true, runValidators: true}
        ).exec();

        if (!updatedPost) {
            throw new Error(`Post with ID ${id} not found`);
        }

        return updatedPost;
    }

    async remove(id: string) {
        const result = await this.postModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async deleteMany(filter: object): Promise<boolean> {
        const result = await this.postModel.deleteMany(filter).exec();
        return result.deletedCount > 0;
    }
}