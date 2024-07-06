import { Injectable } from "@nestjs/common";
import { BaseResponse } from "src/shared/BaseResponse";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUserName(username);

        if (!user) {
            return BaseResponse.error(404, "User not found", null);
        }

        if (!this.isValidPassword(pass, user.password)) {
            return BaseResponse.error(400, "Invalid password", null);
        }

        const { password, ...rest } = user.toObject();

        return BaseResponse.success(200, "User found", rest);
    }

    async isValidPassword(password: string, hashedPassword: string): Promise<boolean> {
        const bcrypt = require("bcryptjs");
        return bcrypt.compareSync(password, hashedPassword);
    }
}
