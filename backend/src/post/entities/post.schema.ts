import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type PostDocument = Post & Document;

@Schema({timestamps: true})
export class Post {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    shortDescription: string;

    @Prop({required: true})
    content: string;

    @Prop({type: Types.ObjectId, ref: 'Blog', required: true})
    blogId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    authorId: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
