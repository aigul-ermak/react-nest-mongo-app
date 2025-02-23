import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {SortPostsDto} from "./dto/sort-post.dto";
import {Request} from 'express';
import {JwtAuthGuard} from "../basics/guards/jwtAuthGuard";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {PostResponseDto} from "./dto/post-response.dto";
import {PaginatedPostsResponseDto} from "./dto/paginated-post-response.dto";


@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @ApiOperation({ summary: 'Creates a new post' })
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
        description: 'Not Found - Blog or user not found',
    })
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
        const user = req.user;
        return this.postService.create(createPostDto, user.userId);
    }

    @ApiOperation({ summary: 'Retrieve all posts with pagination' })
    @ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Number of posts per page (default: 5)' })
    @ApiResponse({
        status: 200,
        description: 'List of posts with pagination',
        type: PaginatedPostsResponseDto,
    })
    @Get()
    findAll(@Query() sortData: SortPostsDto,
            @Req() req: Request) {

        const page = sortData.page || 1;
        const limit = sortData.limit || 5;

        return this.postService.findAll(page, limit);
    }


    @ApiOperation({ summary: 'Retrieve a post by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Unique identifier of the post',
        example: '654e9a3f2f9b4a001d5c1234',
    })
    @ApiResponse({
        status: 200,
        description: 'Post retrieved successfully',
        type: PostResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Post not found',
    })
    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string,
            @Req() req: Request) {
        return this.postService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a post by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Unique identifier of the post to be updated',
        example: '654e9a3f2f9b4a001d5c1234',
    })
    @ApiBody({
        description: 'Updated post data',
        type: UpdatePostDto,
    })
    @ApiResponse({
        status: 204,
        description: 'Post successfully updated (No Content)',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User must be authenticated',
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found - Post not found',
    })
    @Put(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
        const user = req.user;
        return this.postService.update(id, updatePostDto, user.userId);
    }


    @ApiOperation({ summary: 'Delete a post by ID' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Unique identifier of the post to be deleted',
        example: '654e9a3f2f9b4a001d5c1234',
    })
    @ApiResponse({
        status: 204,
        description: 'Post successfully deleted (No Content)',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - User must be authenticated',
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found - Post not found',
    })
    @Delete(':id')
    @HttpCode(204)
    //@UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.postService.remove(id);
    }
}
