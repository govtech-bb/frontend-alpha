import { type NextRequest, NextResponse } from "next/server";
import { fetchPopularPages } from "@/lib/umami-popular-services";

type PopularPagesResponse = {
  success: boolean;
  data?: {
    startAt: number;
    endAt: number;
    contentType?: string;
    pages: Awaited<ReturnType<typeof fetchPopularPages>>;
  };
  error?: string;
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<PopularPagesResponse>> {
  const { searchParams } = new URL(request.url);

  const days = Math.min(
    Math.max(Number(searchParams.get("days") ?? 30), 1),
    365
  );
  const limit = Math.min(
    Math.max(Number(searchParams.get("limit") ?? 10), 1),
    100
  );
  const contentType =
    searchParams.get("contentType")?.toLowerCase() ?? undefined;

  const endAt = Date.now();
  const startAt = endAt - days * 86_400_000;

  const keyword = searchParams.get("keyword")?.toLowerCase() ?? undefined;

  try {
    const pages = await fetchPopularPages({
      startAt,
      endAt,
      contentType,
      keyword,
      maxResults: limit,
    });
    return NextResponse.json({
      success: true,
      data: { startAt, endAt, contentType, pages },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 502 }
    );
  }
}
