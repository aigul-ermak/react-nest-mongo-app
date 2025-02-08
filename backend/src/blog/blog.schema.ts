import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({timestamps: true})
export class Blog {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    authorId: Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
