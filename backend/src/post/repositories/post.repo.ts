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
        return this.postModel
            .findByIdAndUpdate(id, updatePostDto, {new: true})
            .exec();
    }

    async remove(id: string) {
        const result = await this.postModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

}