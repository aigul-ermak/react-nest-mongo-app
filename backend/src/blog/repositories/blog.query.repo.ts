import {InjectModel} from "@nestjs/mongoose";
import {Blog} from "../entities/blog.entity";
import {isValidObjectId, Model} from "mongoose";
import {BlogDocument} from "../entities/blog.schema";


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