import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {SortPostsDto} from "./dto/sort-post.dto";
import {Request} from 'express';
import {JwtAuthGuard} from "../basics/guards/jwtAuthGuard";


@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
        const user = req.user;
        return this.postService.create(createPostDto, user.userId);
    }

    @Get()
    findAll(@Query() sortData: SortPostsDto,
            @Req() req: Request) {

        const page = parseInt(sortData.page, 10) || 1;
        const limit = parseInt(sortData.limit, 10) || 10;

        return this.postService.findAll(page, limit);
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string) {
        return this.postService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postService.remove(+id);
    }
}
