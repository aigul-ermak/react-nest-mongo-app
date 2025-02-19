import {InjectModel} from "@nestjs/mongoose";
import {isValidObjectId, Model} from "mongoose";
import {Blog, BlogDocument} from "../entities/blog.schema";


export class BlogQueryRepo {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    }

    async findOne(id: string): Promise<BlogDocument | null> {

        if (!isValidObjectId(id)) {
            return null;
        }
        return await this.blogModel.findById(id).lean() as BlogDocument;
    }
}