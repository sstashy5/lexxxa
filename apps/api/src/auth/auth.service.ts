import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService) {}

  async register(email: string, password: string) {
    await this.users.ensureUniqueEmail(email);
    const saltRounds = Number(process.env.PASSWORD_SALT_ROUNDS ?? 12);
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return this.users.createUser({ email, passwordHash });
  }

  async validate(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return null;
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      balance: user.balance,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}