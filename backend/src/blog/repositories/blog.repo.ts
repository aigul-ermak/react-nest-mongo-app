import {InjectModel} from "@nestjs/mongoose";
import {Blog} from "../entities/blog.entity";
import {isValidObjectId, Model} from "mongoose";
import {BlogDocument} from "../entities/blog.schema";
import {CreateBlogDto} from "../dto/create-blog.dto";
import {BlogDbType} from "../dto/types/blogDbType";

export class BlogRepo {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog  = new this.blogModel({...createBlogDto});
        return blog.save();
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.blogModel.findByIdAndDelete(id).exec();
        return result !== null;
    }


}