import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	hashPassword = (password: string) => {
		const bcrypt = require("bcryptjs");
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync("B4c0/\/", salt);
		return hash;
	};

	async create(createUserDto: CreateUserDto) {
		createUserDto.password = this.hashPassword(createUserDto.password);
		const newUser = await this.userModel.create(createUserDto);
		return newUser;
	}

	findAll() {
		return `This action returns all users`;
	}

	findOne(id: string) {
		try {
			return this.userModel.findOne({ _id: id }).select("-__v").exec();
		} catch (error) {
			throw new Error(error);
		}
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.userModel.updateOne({ _id: id }, updateUserDto).exec();
	}

	remove(id: string) {
		return this.userModel.deleteOne({ _id: id }).exec();
	}
}
