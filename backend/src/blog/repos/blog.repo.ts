import {InjectModel} from "@nestjs/mongoose";
import {Blog} from "../entities/blog.entity";
import {Model} from "mongoose";
import {BlogDocument} from "../entities/blog.schema";
import {CreateBlogDto} from "../dto/create-blog.dto";

export class BlogRepo {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog = new this.blogModel({...createBlogDto});
        return blog.save();
    }
}