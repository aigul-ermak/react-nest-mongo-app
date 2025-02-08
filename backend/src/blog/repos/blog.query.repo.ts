import {InjectModel} from "@nestjs/mongoose";
import {Blog} from "../entities/blog.entity";
import {Model} from "mongoose";
import {BlogDocument} from "../entities/blog.schema";
import {NotFoundException} from "@nestjs/common";


export class BlogQueryRepo {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    }

    async findOne(id: string): Promise<Blog> {
        const blog = await this.blogModel.findById(id).populate('authorId', '-passwordHash');
        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }


}