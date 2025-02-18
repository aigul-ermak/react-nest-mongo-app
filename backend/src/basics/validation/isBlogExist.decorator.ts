import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {Injectable} from '@nestjs/common';
import {BlogQueryRepo} from "../../blog/repositories/blog.query.repo";


@ValidatorConstraint({name: 'IsBlogByIdExists', async: true})
@Injectable()
export class IsBlogByIdExistsConstraint implements ValidatorConstraintInterface {
    constructor(private readonly blogsQueryRepo: BlogQueryRepo) {
    }

    async validate(blogId: string, args: ValidationArguments) {

        const blog = await this.blogsQueryRepo.findOne(blogId);
        return !!blog;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Blog with the given ID does not exist';
    }
}

