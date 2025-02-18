import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {BlogQueryRepo} from "./repositories/blog.query.repo";
import {BlogRepo} from "./repositories/blog.repo";
import {BlogOutputModel, BlogMapper} from "./dto/mapper/blog.mapper";
import {BlogDocument} from "./entities/blog.schema";

@Injectable()
export class BlogService {

    constructor(
        private readonly blogRepo: BlogRepo,
        private readonly blogQueryRepo: BlogQueryRepo,
    ) {
    }

    async create(createBlogDto: CreateBlogDto) {
        return this.blogRepo.create(createBlogDto);
    }

    findAll() {
        return `This action returns all blog`;
    }

    async findOne(id: string): Promise<BlogOutputModel | null> {
        const blog: BlogDocument | null = await this.blogQueryRepo.findOne(id);

        if (!blog) {
            throw new NotFoundException(`Blog not found`);
        }

        return BlogMapper(blog)

    }

    async update(id: string, updateBlogDto: UpdateBlogDto) {
        const blog: BlogDocument | null = await this.blogQueryRepo.findOne(id);

        if (!blog) {
            throw new NotFoundException(`Blog not found`);
        }

        return await this.blogRepo.update(id, updateBlogDto);
    }

    async remove(id: string): Promise<boolean> {
        const blog: BlogDocument | null = await this.blogQueryRepo.findOne(id);

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return await this.blogRepo.delete(id);
    }
}
