import {InjectModel} from "@nestjs/mongoose";
import {isValidObjectId, Model} from "mongoose";
import {Blog, BlogDocument} from "../entities/blog.schema";
import {BlogMapper} from "../dto/mapper/blog.mapper";


export class BlogQueryRepo {
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {
    }

    async findOne(id: string): Promise<BlogDocument | null> {

        if (!isValidObjectId(id)) {
            return null;
        }
        return await this.blogModel.findById(id).lean() as BlogDocument;
    }

    async getAllBlogs(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const posts = await this.blogModel.find()
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await this.blogModel.countDocuments();

        const mappedBlogs = posts.map(post => BlogMapper(post));

        return {
            blog: mappedBlogs,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getPostsForBlog(blogId: string, sortData: { sortBy: string, order: number }) {
        const { sortBy, order } = sortData;

        const blog = await this.blogModel
            .findById(blogId)
            .lean()
            .populate({
                path: 'posts',
                options: {
                    sort: { [sortBy]: order }
                }
            });

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }

}