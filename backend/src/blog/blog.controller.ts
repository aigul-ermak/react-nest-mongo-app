import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {BlogService} from "./blog.service";
import {BlogOutputModel} from "./dto/mapper/blog.mapper";
import {SortPostsDto} from "../post/dto/sort-post.dto";
import {Request} from "express";
import {JwtAuthGuard} from "../basics/guards/jwtAuthGuard";
import {CreatePostDto} from "../post/dto/create-post.dto";

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createBlogDto: CreateBlogDto, @Req() req: Request) {
        const user = req.user;
        return await this.blogService.create(createBlogDto, user.userId);
    }

    @Post('/:id/posts')
    @UseGuards(JwtAuthGuard)
    async createPostForBlog(
        @Param('id') blogId: string,
        @Body() createPostDto: CreatePostDto,
        @Req() req: Request) {
        const user = req.user;
        return await this.blogService.createPostForBlog(createPostDto, user.userId, blogId);
    }

    @Get()
    async findAll(@Query() sortData: SortPostsDto,
                  @Req() req: Request) {

        const page = sortData.page || 1;
        const limit = sortData.limit || 10;
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
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @Req() req: Request) {
        const user = req.user;

        return await this.blogService.update(id, updateBlogDto, user.userId);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string): Promise<boolean> {
        return await this.blogService.remove(id);
    }
}
