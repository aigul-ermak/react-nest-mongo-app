import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {UserQueryRepo} from "../user/repositories/user.query.repo";
import {PostRepo} from "./repositories/post.repo";
import {PostQueryRepo} from "./repositories/post.query.repo";
import {BlogDocument} from "../blog/entities/blog.schema";
import {BlogQueryRepo} from "../blog/repositories/blog.query.repo";
import {PostInputType} from "./dto/types/post.input.type";
import {UserOutputModel} from "../user/dto/mapper/user.mapper";
import {PostMapper} from "./dto/mapper/post.mapper";

@Injectable()
export class PostService {

    constructor(
        private readonly postRepo: PostRepo,
        private readonly postQueryRepo: PostQueryRepo,
        private readonly userQueryRepo: UserQueryRepo,
        private readonly blogQueryRepo: BlogQueryRepo,
    ) {
    }

    async create(createPostDto: CreatePostDto, id: string) {
        const blog: BlogDocument | null = await this.blogQueryRepo.findOne(createPostDto.blogId);

        if (!blog) {
            throw new NotFoundException(`Blog not found`);
        }

        const user: UserOutputModel | null = await this.userQueryRepo.findOne(id);

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        const newCreatePost: PostInputType = {
            ...createPostDto,
            authorId: user.id
        }

        const createdPost = await this.postRepo.insert(newCreatePost);

        const post = await this.postQueryRepo.findOne(createdPost.id);
        console.log("post", post)
        if (!post) {
            throw new NotFoundException(`Post not found`);
        }

        return PostMapper(post)
    }

    async findAll(page: number, limit: number) {
        return this.postQueryRepo.getAllPosts(page, limit);
    }

    async findOne(id: string) {
        const post = await this.postQueryRepo.findOne(id);

        if (!post) {
            throw new NotFoundException(`Post not found`);
        }

        return PostMapper(post);
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
