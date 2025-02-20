import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {BlogService} from "./blog.service";
import {BlogOutputModel} from "./dto/mapper/blog.mapper";
import {SortPostsDto} from "../post/dto/sort-post.dto";
import {Request} from "express";

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {
    }

    @Post()
    async create(@Body() createBlogDto: CreateBlogDto) {
        return await this.blogService.create(createBlogDto);
    }

    @Get()
    async findAll(@Query() sortData: SortPostsDto,
                  @Req() req: Request) {

        const page = parseInt(sortData.page, 10) || 1;
        const limit = parseInt(sortData.limit, 10) || 10;

        return await this.blogService.findAll(page, limit);
    }

    @Get(':id/posts')
    async getPostsForBlog(@Param('id') blogId: string,
                          @Query() sortData: SortPostsDto,
                          @Req() req: Request) {

        const userId = req['userId'];

        return await this.blogService.findPostsForBlog(blogId, sortData);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<BlogOutputModel> {
        return await this.blogService.findOne(id);
    }

    @Put(':id')
    @HttpCode(204)
    async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        return await this.blogService.update(id, updateBlogDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string): Promise<boolean> {
        return await this.blogService.remove(id);
    }
}
