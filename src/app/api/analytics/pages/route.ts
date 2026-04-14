import { type NextRequest, NextResponse } from "next/server";
import { fetchPopularPages } from "@/lib/umami-popular-services";

type PopularPagesResponse = {
  success: boolean;
  data?: {
    startAt: number;
    endAt: number;
    type: string;
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
  const type = searchParams.get("type") ?? "path";

  const endAt = Date.now();
  const startAt = endAt - days * 86_400_000;

  try {
    const pages = await fetchPopularPages({ startAt, endAt, type, limit });
    return NextResponse.json({
      success: true,
      data: { startAt, endAt, type, pages },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 502 }
    );
  }
}
