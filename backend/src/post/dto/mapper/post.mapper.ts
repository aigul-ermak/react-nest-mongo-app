import {PostDocument} from "../../entities/post.schema";


export class PostOutputModel {
    id: string
    title: string;
    shortDescription: string;
    content: string;
    createdAt: Date;
    updatedAt: Date
}

export const PostMapper = (post) => {
    const outputModel: PostOutputModel = new PostOutputModel();

    outputModel.id = post._id;
    outputModel.title = post.title;
    outputModel.shortDescription = post.shortDescription;
    outputModel.content = post.content;
    outputModel.createdAt = post.createdAt;
    outputModel.updatedAt = post.updatedAt;

    return outputModel;
}
