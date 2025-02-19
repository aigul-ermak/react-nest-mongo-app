import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Post, PostDocument} from "../entities/post.schema";


export class PostRepo {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {
    }

    async insert(post) {
        const res = await this.postModel.insertMany(post);
        return res[0];
    }


}