import {UserDocument} from "../../entities/user.schema";

export class UserLoginOutputModel {
    id: string;
    login: string
    email: string
    password: string
}

export const UserLoginMapper = (user: UserDocument): UserLoginOutputModel => {
    const outputModel = new UserLoginOutputModel();

    outputModel.id = user.id;
    outputModel.login = user.login;
    outputModel.email = user.email;
    outputModel.password = user.password;

    return outputModel;
}