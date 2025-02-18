import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User} from "./entities/user.entity";
import {UserSchema} from "./entities/user.schema";
import {UserRepo} from "./repositories/user.repo";
import {UserQueryRepo} from "./repositories/user.query.repo";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService, UserRepo, UserQueryRepo],
    exports: [UserRepo, UserQueryRepo],
})
export class UserModule {
}
