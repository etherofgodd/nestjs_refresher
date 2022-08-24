import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    userId: string

    @Prop()
    email: string;

    @Prop()
    age: number;

    @Prop([String])
    favouriteFoods: string[];
}

export const UserSchema = SchemaFactory.createForClass(User)