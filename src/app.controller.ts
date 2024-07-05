import { Controller, Get, Render } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";

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
}

