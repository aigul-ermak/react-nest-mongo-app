import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {BlogQueryRepo} from "./repositories/blog.query.repo";
import {BlogRepo} from "./repositories/blog.repo";
import {BlogMapper, BlogOutputModel} from "./dto/mapper/blog.mapper";
import {BlogDocument} from "./entities/blog.schema";
import {SortPostsDto} from "../post/dto/sort-post.dto";
import {PostQueryRepo} from "../post/repositories/post.query.repo";

@Injectable()
export class BlogService {

    constructor(
        private readonly blogRepo: BlogRepo,
        private readonly blogQueryRepo: BlogQueryRepo,
        private readonly postQueryRepo: PostQueryRepo,
    ) {
    }

    async create(createBlogDto: CreateBlogDto) {
        return await this.blogRepo.create(createBlogDto);
    }

    async findAll(page: number, limit: number) {
        return await this.blogQueryRepo.getAllBlogs(page, limit);
    }

    async findPostsForBlog(blogId: string, sortData: SortPostsDto) {
        const page = sortData.page ?? 1;
        const size = sortData.limit ?? 10;

        // Check if blog exists
        const blog = await this.blogQueryRepo.findOne(blogId);
        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        // Count total posts in the blog
        const totalCount: number = await this.postQueryRepo.countPostsByBlogId(blogId);
        const pagesCount: number = Math.ceil(totalCount / size);

        const skip = (page - 1) * size;

        // Fetch paginated posts
        const posts = await this.postQueryRepo.findAllPostsPaginated(blogId, skip, size);

        return {
            pagesCount,
            page,
            pageSize: size,
            totalCount,
            items: posts,
        };
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
