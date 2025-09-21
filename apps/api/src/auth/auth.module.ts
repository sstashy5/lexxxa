import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { SessionService } from "./session.service";

@Module({
  imports: [UsersModule],
  providers: [AuthService, SessionService],
  controllers: [AuthController],
})
export class AuthModule {}