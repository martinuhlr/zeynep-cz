import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

const COOKIE = "NEXT_LOCALE";

/** Picks the best supported locale from an Accept-Language header. */
function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => {
        const [tag, qPart] = part.trim().split(";q=");
        return { tag: tag.toLowerCase(), q: qPart ? parseFloat(qPart) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { tag } of preferred) {
      const primary = tag.split("-")[0];
      if (isLocale(primary)) return primary;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/") return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(COOKIE, locale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
  return response;
}

export const config = {
  matcher: ["/"],
};
