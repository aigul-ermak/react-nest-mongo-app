import {Injectable} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {BlogQueryRepo} from "./repos/blog.query.repo";
import {BlogRepo} from "./repos/blog.repo";

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

    findOne(id: number) {
        return `This action returns a #${id} blog`;
    }

    update(id: number, updateBlogDto: UpdateBlogDto) {
        return `This action updates a #${id} blog`;
    }

    remove(id: number) {
        return `This action removes a #${id} blog`;
    }
}
