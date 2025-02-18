import {BadRequestException, Injectable} from '@nestjs/common';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {CreateUserDto} from "../user/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import {UserRepo} from "../user/repositories/user.repo";
import {UserQueryRepo} from "../user/repositories/user.query.repo";

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepo: UserRepo,
        private readonly userQueryRepo: UserQueryRepo,
    ) {
    }

    async create(createUserDto: CreateUserDto) {

        const existsUserByLogin = await this.userQueryRepo.findOneByLoginOrEmail(createUserDto.login);
        const existsUserByEmail = await this.userQueryRepo.findOneByLoginOrEmail(createUserDto.email);

        if (existsUserByLogin) {
            throw new BadRequestException({
                errorsMessages: [
                    {
                        message: 'User with this login already exists',
                        field: 'login',
                    }
                ]
            });
        }

        if (existsUserByEmail) {
            throw new BadRequestException({
                errorsMessages: [
                    {
                        message: 'User with this email already exists',
                        field: 'email',
                    }
                ]
            });
        }

        const saltRounds: number = 10;
        const passwordHashed: string = await bcrypt.hash(createUserDto.password, saltRounds);


        const newUser = {
            login: createUserDto.login,
            email: createUserDto.email,
            password: passwordHashed,
        }

        const userId = await this.userRepo.create(newUser);

        if (!newUser) {
            throw new BadRequestException('User creation failed');
        }

        return userId;
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
