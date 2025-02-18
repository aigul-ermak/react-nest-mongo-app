import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    iatDate: Date;

    @Prop({required: true})
    expDate: Date;
}

export const SessionEntity = SchemaFactory.createForClass(Session);