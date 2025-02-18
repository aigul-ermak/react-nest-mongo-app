import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserRepo} from "../user/repositories/user.repo";
import {UserQueryRepo} from "../user/repositories/user.query.repo";
import {MongooseModule} from "@nestjs/mongoose";
import {User} from "../user/entities/user.entity";
import {UserSchema} from "../user/entities/user.schema";
import {UserService} from "../user/user.service";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserRepo, UserQueryRepo],
})
export class AuthModule {
}
