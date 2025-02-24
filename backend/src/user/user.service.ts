import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UserRepo} from "./repositories/user.repo";
import {UserQueryRepo} from "./repositories/user.query.repo";
import {User} from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepo: UserRepo,
        private readonly userQueryRepo: UserQueryRepo,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const existingUser: User | null = await this.userQueryRepo.findOneByEmail(createUserDto.email);

        if (existingUser) {
            throw new ConflictException(`User with this email already exists`);
        }

        const saltRounds: number = 10;
        const passwordHashed: string = await bcrypt.hash(createUserDto.password, saltRounds);


        const newUser = {
            login: createUserDto.login,
            email: createUserDto.email,
            password: passwordHashed,
        }

        const userId = await this.userRepo.create(newUser);

        return await this.userQueryRepo.findOne(userId);
    }

    async findOne(id: string) {
        return await this.userQueryRepo.findOne(id);
    }

    async remove(id: string) {
        const user = await this.userQueryRepo.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.userRepo.remove(id);
    }
}
