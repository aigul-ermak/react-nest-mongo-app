import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./entities/post.schema";
import {PostRepo} from "./repositories/post.repo";
import {PostQueryRepo} from "./repositories/post.query.repo";
import {BlogQueryRepo} from "../blog/repositories/blog.query.repo";
import {Blog, BlogSchema} from "../blog/entities/blog.schema";
import {UserQueryRepo} from "../user/repositories/user.query.repo";
import {UserModule} from "../user/user.module";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
        MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}]),
        UserModule,
    ],
    controllers: [PostController],
    providers: [PostService, JwtService, PostRepo, PostQueryRepo, BlogQueryRepo, UserQueryRepo],
    exports: [PostRepo,  PostQueryRepo, MongooseModule],
})
export class PostModule {
}
