import {InjectModel} from "@nestjs/mongoose";
import {Blog} from "../entities/blog.entity";
import {Model} from "mongoose";
import {BlogDocument} from "../entities/blog.schema";
import {CreateBlogDto} from "../dto/create-blog.dto";
import {UpdateBlogDto} from "../dto/update-blog.dto";

export class BlogRepo {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog = new this.blogModel({...createBlogDto});
        return blog.save();
    }

    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const result = this.blogModel
            .findByIdAndUpdate(id, updateBlogDto, {new: true})
            .exec();
        console.log("result in update repo", result)
        return result;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.blogModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

}