import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
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
    // @UseGuards(JwtAuthNullableGuard)
    findOne(@Param('id') id: string,
            @Req() req: Request) {
        // const userId = req['userId'];

        return this.postService.findOne(id);
    }

    @Put(':id')
    @HttpCode(204)
    // @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        // const user = req.user;
        return this.postService.update(id, updatePostDto);
    }


    @Delete(':id')
    @HttpCode(204)
    //@UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.postService.remove(id);
    }
}
