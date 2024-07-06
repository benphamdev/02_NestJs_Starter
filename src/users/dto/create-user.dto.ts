import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
	@IsEmail({}, { message: "email invalid" })
	email: string;

	@IsNotEmpty()
	password: string;

	name: string;

	age: number;

	address: string;

	@MinLength(10, {
		message: "phoneNumber is 10 num"
	})
	@MaxLength(10, {
		message: "phoneNumber is 10 num"
	})
	phoneNumber: string;
}
