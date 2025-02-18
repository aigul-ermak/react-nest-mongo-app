import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserRepo} from "../user/repositories/user.repo";
import {UserQueryRepo} from "../user/repositories/user.query.repo";
import {MongooseModule} from "@nestjs/mongoose";
import {User} from "../user/entities/user.entity";
import {UserSchema} from "../user/entities/user.schema";
import {UserService} from "../user/user.service";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('jwtSettings.JWT_ACCESS_SECRET'),

                    signOptions: {
                        expiresIn: configService.get<string>('jwtSettings.ACCESS_TOKEN_EXPIRY'),
                    },

                }
            },
        }),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, UserRepo, UserQueryRepo],
    exports: [JwtModule],

})

export class AuthModule {
}
