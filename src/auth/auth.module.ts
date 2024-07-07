import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./passport/local.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get<string>("SECRET_KEY"),
                signOptions: {
                    expiresIn: configService.get<string>("EXPIRES_IN"),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}
