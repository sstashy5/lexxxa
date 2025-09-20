import { Injectable } from "@nestjs/common";
import crypto from "node:crypto";

type SessionRecord = {
  userId: number;
  createdAt: number;
  lastSeenAt: number;
};

@Injectable()
export class SessionService {
  private sessions = new Map<string, SessionRecord>();

  create(userId: number): string {
    const token = crypto.randomBytes(32).toString("hex");
    const now = Date.now();
    this.sessions.set(token, { userId, createdAt: now, lastSeenAt: now });
    return token;
  }

  get(token: string | undefined | null): SessionRecord | undefined {
    if (!token) return undefined;
    const s = this.sessions.get(token);
    if (s) {
      s.lastSeenAt = Date.now();
      this.sessions.set(token, s);
    }
    return s;
  }

  destroy(token: string | undefined | null) {
    if (!token) return;
    this.sessions.delete(token);
  }
}