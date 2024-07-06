import { Controller, Get, Post, Render, Request, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private configService: ConfigService) {}

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
    async login(@Request() req) {
        return req.user;
    }
}
