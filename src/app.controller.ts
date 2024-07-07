import { Controller, Get, HttpCode, Post, Render, Request, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { BaseResponse } from "./shared/BaseResponse";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private configService: ConfigService,
        private authService: AuthService
    ) {}

    @Get()
    @Render("home")
    getHello() {
        let message = this.appService.getHello();
        console.log(this.configService.get<string>("PORT"));
        return { message: message };
        // return this.appService.getHello();
    }

    @UseGuards(LocalAuthGuard)
    @Post("api/v1/auth/login")
    @HttpCode(200)
    async login(@Request() req) {
        // return req.user;
        console.log(req.user);
        let response = await this.authService.login(req.user);
        return BaseResponse.success(200, "Login successful", response);
    }
}
