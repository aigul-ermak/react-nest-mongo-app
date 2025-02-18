import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {BlogModule} from './blog/blog.module';
import {UserModule} from './user/user.module';
import {PostModule} from './post/post.module';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "./auth/auth.module";
import {SessionModule} from './session/session.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
        BlogModule,
        UserModule,
        PostModule,
        AuthModule,
        SessionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
