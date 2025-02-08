import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateBlogDto} from './dto/create-blog.dto';
import {UpdateBlogDto} from './dto/update-blog.dto';
import {BlogService} from "./blog.service";

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {
    }

    /**
     * Create a new blog
     * @param createBlogDto
     * @param userId
     */
    @Post()
    create(@Body() createBlogDto: CreateBlogDto) {
        return this.blogService.create(createBlogDto);
    }

    @Get()
    findAll() {
        // return this.blogService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        // return this.blogService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
        // return this.blogService.update(+id, updateBlogDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // return this.blogService.remove(+id);
    }
}
