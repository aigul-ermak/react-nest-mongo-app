import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {BlogQueryRepo} from "./repositories/blog.query.repo";
import {BlogRepo} from "./repositories/blog.repo";
import {BlogMapper, BlogOutputModel} from "./dto/mapper/blog.mapper";
import {BlogDocument} from "./entities/blog.schema";
import {SortPostsDto} from "../post/dto/sort-post.dto";
import {PostQueryRepo} from "../post/repositories/post.query.repo";
import {UserOutputModel} from "../user/dto/mapper/user.mapper";
import {UserQueryRepo} from "../user/repositories/user.query.repo";
import {BlogInputType} from "./dto/types/blog.input.type";
import {PostMapper} from "../post/dto/mapper/post.mapper";
import {PostRepo} from "../post/repositories/post.repo";

@Injectable()
export class BlogService {

    constructor(
        private readonly blogRepo: BlogRepo,
        private readonly postRepo: PostRepo,
        private readonly blogQueryRepo: BlogQueryRepo,
        private readonly postQueryRepo: PostQueryRepo,
        private readonly userQueryRepo: UserQueryRepo,
    ) {
    }

    async create(createBlogDto: CreateBlogDto, id: string) {
        const user: UserOutputModel | null = await this.userQueryRepo.findOne(id);

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        const newCreateBlog: BlogInputType = {
            ...createBlogDto,
            authorId: user.id
        }

        const newBlog = await this.blogRepo.create(newCreateBlog);

        return BlogMapper(newBlog);
    }

    async createPostForBlog(createPostDto, userId: string, blogId: string) {
        const user: UserOutputModel | null = await this.userQueryRepo.findOne(userId);

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        const newCreatePost = {
            ...createPostDto,
            blogId: blogId,
            authorId: user.id
        }

        const newPost = await this.postRepo.insert(newCreatePost);

        return PostMapper(newPost);
    }

    async findAll(page: number, limit: number) {
        return await this.blogQueryRepo.getAllBlogs(page, limit);
    }

    async findPostsForBlog(blogId: string, sortData: SortPostsDto) {
        const page = sortData.page ?? 1;
        const size = sortData.limit ?? 5;

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

    async update(id: string, updateBlogDto: UpdateBlogDto, userId: string) {
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

        await this.postRepo.deleteMany({blogId: id});

        return await this.blogRepo.delete(id);
    }
}
