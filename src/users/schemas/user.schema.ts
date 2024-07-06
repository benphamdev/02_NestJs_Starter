import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TimeStamps } from "../../shared/TimeStamps";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends TimeStamps {
	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop()
	name: string;

	@Prop()
	age: number;

	@Prop()
	address: string;

	@Prop()
	phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);