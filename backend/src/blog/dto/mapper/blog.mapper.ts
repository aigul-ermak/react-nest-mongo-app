export class BlogOutputModel {
    id: string
    title: string
    description: string
    authorId: string
    createdAt: Date
    updatedAt: Date
}

export const BlogMapper = (blog) => {

    const outputModel: BlogOutputModel = new BlogOutputModel();

    outputModel.id = blog._id.toString();
    outputModel.title = blog.title;
    outputModel.description = blog.description;
    outputModel.authorId = blog.authorId.toString();
    outputModel.createdAt = blog.createdAt;
    outputModel.updatedAt = blog.updatedAt;

    return outputModel
}