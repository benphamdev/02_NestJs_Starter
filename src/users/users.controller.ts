import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BaseResponse } from "../shared/BaseResponse";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("api/v1/users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return BaseResponse.success<{}>(201, "User created", {
            _id: user._id,
            email: user.email,
        });
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") userId: string) {
        // const id: string = req.params.id;
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return { statusCode: 400, message: "Invalid user ID" };
        }

        const user = await this.usersService.findOne(userId);
        if (!user) return { statusCode: 404, message: "User not found" };

        const { password, ...rest } = user.toObject();

        return BaseResponse.success<{}>(200, "User found", rest);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return { statusCode: 400, message: "Invalid user ID" };
        }
        const response = await this.usersService.update(id, updateUserDto);
        return BaseResponse.success<{}>(200, "User found", response);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return { statusCode: 400, message: "Invalid user ID" };
        }
        return BaseResponse.success<{}>(200, "User deleted", this.usersService.remove(id));
    }
}
