import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/library/auth/auth";
import { routing } from "./library/i18n/routing";

// 创建国际化中间件
const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 需要认证的路径（不包含语言前缀）
  const protectedPaths = [
    "/subscription",
    "/success",
    "/protected-test",
    "/auth-test",
  ];

  // 提取语言前缀后的路径
  const pathnameWithoutLocale =
    pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  // 检查当前路径是否需要保护
  const isProtectedPath = protectedPaths.some((path) =>
    pathnameWithoutLocale.includes(path)
  );

  if (isProtectedPath) {
    // 获取当前会话
    const session = await auth();

    // 如果没有会话，重定向到登录页面
    if (!session?.user) {
      // 获取当前语言，优先从路径中提取，否则使用默认语言
      const locale = pathname.split("/")[1] || "en";
      const loginUrl = new URL(`/${locale}/login`, request.url);
      // 保存原始URL以便登录后重定向
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 处理国际化路由
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
