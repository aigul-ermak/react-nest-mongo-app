import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Post} from "@nestjs/common";
import {PostDocument} from "../entities/post.schema";


export class PostRepo {
    constructor(@InjectModel(Post.name) private blogModel: Model<PostDocument>) {
    }

}