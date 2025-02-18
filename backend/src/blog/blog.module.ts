import {Module} from '@nestjs/common';
import {BlogService} from './blog.service';
import {BlogController} from './blog.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Blog} from "./entities/blog.entity";
import {BlogSchema} from "./entities/blog.schema";
import {BlogRepo} from "./repositories/blog.repo";
import {BlogQueryRepo} from "./repositories/blog.query.repo";

@Module({
    imports: [MongooseModule.forFeature([{name: Blog.name, schema: BlogSchema}])],
    controllers: [BlogController],
    providers: [BlogService, BlogRepo, BlogQueryRepo],
    exports: [BlogRepo, BlogQueryRepo],
})
export class BlogModule {
}
