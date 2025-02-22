import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Blog, BlogDocument} from "../entities/blog.schema";
import {UpdateBlogDto} from "../dto/update-blog.dto";

export class BlogRepo {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    }

    async create(newCreateBlog) {
        const res = await this.blogModel.insertMany(newCreateBlog);
        return res[0];
    }

    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const result = await this.blogModel
            .findByIdAndUpdate(id, updateBlogDto, {new: true})
            .exec();

        return result;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.blogModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

}