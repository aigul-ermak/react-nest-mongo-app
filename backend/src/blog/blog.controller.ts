import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {BlogService} from "./blog.service";
import {BlogOutputModel} from "./dto/mapper/blog.mapper";
import {SortPostsDto} from "../post/dto/sort-post.dto";
import {Request} from "express";
import {JwtAuthGuard} from "../basics/guards/jwtAuthGuard";
import {CreatePostDto} from "../post/dto/create-post.dto";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {BlogResponseDto} from "./dto/blog-response.dto";
import {PostResponseDto} from "../post/dto/post-response.dto";
import {PaginatedBlogsResponseDto} from "./dto/paginated-blog-response.dto";
import {PaginatedPostsResponseDto} from "../post/dto/paginated-post-response.dto";

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) {
    }

    @ApiOperation({ summary: 'Creates a new blog' })
    @ApiBody({
        description: 'Blog creation data',
        type: CreateBlogDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Blog successfully created',
        type: BlogResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User must be authenticated',
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found - User not found',
    })
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createBlogDto: CreateBlogDto, @Req() req: Request) {
        const user = req.user;
        return await this.blogService.create(createBlogDto, user.userId);
    }


    @ApiOperation({ summary: 'Creates a new post for a specific blog' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Unique identifier of the blog',
        example: '654e9a3f2f9b4a001d5c1234',
    })
    @ApiBody({
        description: 'Post creation data',
        type: CreatePostDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Post successfully created',
        type: PostResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User must be authenticated',
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found - User or blog not found',
    })
    @Post('/:id/posts')
    @UseGuards(JwtAuthGuard)
    async createPostForBlog(
        @Param('id') blogId: string,
        @Body() createPostDto: CreatePostDto,
        @Req() req: Request) {
        const user = req.user;
        return await this.blogService.createPostForBlog(createPostDto, user.userId, blogId);
    }

    @ApiOperation({ summary: 'Retrieve all blogs with pagination' })
    @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Number of blogs per page (default: 5)' })
    @ApiResponse({
        status: 200,
        description: 'List of blogs with pagination',
        type: PaginatedBlogsResponseDto,
    })
    @Get()
    async findAll(@Query() sortData: SortPostsDto,
                  @Req() req: Request) {

        const page = sortData.page || 1;
        const limit = sortData.limit || 5;
        return await this.blogService.findAll(page, limit);
    }

    @ApiOperation({ summary: 'Retrieve posts for a specific blog with pagination' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Unique identifier of the blog',
        example: '654e9a3f2f9b4a001d5c1234',
    })
    @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Number of posts per page (default: 5)' })
    @ApiResponse({
        status: 200,
        description: 'List of posts for the given blog with pagination',
        type: PaginatedPostsResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Blog not found',
    })
    @Get(':id/posts')
    async getPostsForBlog(@Param('id') blogId: string,
                          @Query() sortData: SortPostsDto,
                          @Req() req: Request) {

        const userId = req['userId'];

        return await this.blogService.findPostsForBlog(blogId, sortData);
    }

    @ApiOperation({ summary: 'Retrieve a blog by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Unique identifier of the blog',
        example: '654e9a3f2f9b4a001d5c1234',
    })
    @ApiResponse({
        status: 200,
        description: 'Blog retrieved successfully',
        type: BlogResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Blog not found',
    })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<BlogOutputModel> {
        return await this.blogService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a blog by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Unique identifier of the blog to be updated',
        example: '654e9a3f2f9b4a001d5c1234',
    })
    @ApiBody({
        description: 'Updated blog data',
        type: UpdateBlogDto,
    })
    @ApiResponse({
        status: 204,
        description: 'Blog successfully updated (No Content)',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User must be authenticated',
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found - Blog not found',
    })
    @Put(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @Req() req: Request) {
        const user = req.user;

        return await this.blogService.update(id, updateBlogDto, user.userId);
    }

    @ApiOperation({ summary: 'Delete a blog by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Unique identifier of the blog to be deleted',
        example: '654e9a3f2f9b4a001d5c1234',
    })
    @ApiResponse({
        status: 204,
        description: 'Blog successfully deleted (No Content)',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User must be authenticated',
    })
    @ApiResponse({
        status: 404,
        description: 'Blog not found',
    })
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string): Promise<boolean> {
        return await this.blogService.remove(id);
    }
}
