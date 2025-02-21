import {Module} from '@nestjs/common';
import {BlogService} from './blog.service';
import {BlogController} from './blog.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./entities/blog.schema";
import {BlogRepo} from "./repositories/blog.repo";
import {BlogQueryRepo} from "./repositories/blog.query.repo";
import {PostQueryRepo} from "../post/repositories/post.query.repo";
import {PostModule} from "../post/post.module";

@Module({
    imports: [MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
    PostModule],
    controllers: [BlogController],
    providers: [BlogService, BlogRepo, BlogQueryRepo, PostQueryRepo],
    exports: [BlogRepo, BlogQueryRepo, PostQueryRepo],
})
export class BlogModule {
}
