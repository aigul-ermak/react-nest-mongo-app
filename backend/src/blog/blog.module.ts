import {Module} from '@nestjs/common';
import {BlogService} from './blog.service';
import {BlogController} from './blog.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Blog, BlogSchema} from "./entities/blog.schema";
import {BlogRepo} from "./repositories/blog.repo";
import {BlogQueryRepo} from "./repositories/blog.query.repo";
import {PostQueryRepo} from "../post/repositories/post.query.repo";
import {PostModule} from "../post/post.module";
import {UserQueryRepo} from "../user/repositories/user.query.repo";
import {UserModule} from "../user/user.module";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
        PostModule, UserModule],
    controllers: [BlogController],
    providers: [BlogService, JwtService, BlogRepo, BlogQueryRepo, PostQueryRepo, UserQueryRepo],
    exports: [BlogRepo, BlogQueryRepo, PostQueryRepo, MongooseModule],
})
export class BlogModule {
}
