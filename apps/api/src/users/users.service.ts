import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: { email: string; passwordHash: string; displayName?: string }) {
    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        displayName: data.displayName ?? null,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        balance: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateBalance(userId: number, amountDelta: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amountDelta } },
      select: { id: true, balance: true },
    });
  }

  async ensureUniqueEmail(email: string) {
    const existing = await this.findByEmail(email);
    if (existing) {
      const err = new Error("Email already in use");
      // @ts-ignore
      err.status = 409;
      throw err;
    }
  }
}