import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SessionService } from "./session.service";
import { Response, Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly sessions: SessionService
  ) {}

  @Post("register")
  async register(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const { email, password } = body ?? ({} as any);
    if (!email || !password) {
      res.status(400);
      return { error: "Email and password are required" };
    }
    const user = await this.auth.register(email, password);
    // Auto-login after registration
    const sid = this.sessions.create(user.id);
    this.setSessionCookie(res, sid);
    return { user };
    }

  @Post("login")
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const { email, password } = body ?? ({} as any);
    if (!email || !password) {
      res.status(400);
      return { error: "Email and password are required" };
    }
    const user = await this.auth.validate(email, password);
    if (!user) {
      res.status(401);
      return { error: "Invalid credentials" };
    }
    const sid = this.sessions.create(user.id);
    this.setSessionCookie(res, sid);
    return { user };
  }

  @Post("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sid = req.cookies?.sid;
    this.sessions.destroy(sid);
    res.clearCookie("sid", this.cookieOptions());
    return { ok: true };
  }

  @Get("me")
  async me(@Req() req: Request) {
    const sid = req.cookies?.sid;
    const session = this.sessions.get(sid);
    if (!session) {
      return { user: null };
    }
    return { userId: session.userId };
  }

  private setSessionCookie(res: Response, sid: string) {
    res.cookie("sid", sid, this.cookieOptions());
  }

  private cookieOptions() {
    const isProd = process.env.NODE_ENV === "production";
    return {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: isProd,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    };
  }
}