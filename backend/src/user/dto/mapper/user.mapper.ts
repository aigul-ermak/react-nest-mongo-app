import {UserDocument} from "../../entities/user.schema";

export class UserOutputModel {
    id: string;
    login: string
    email: string
}

export const UserMapper = (user: UserDocument): UserOutputModel => {
    const outputModel = new UserOutputModel();

    outputModel.id = user.id;
    outputModel.login = user.login;
    outputModel.email = user.email;

    return outputModel;
}