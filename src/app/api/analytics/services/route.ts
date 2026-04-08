import { type NextRequest, NextResponse } from "next/server";
import { fetchPopularServiceViews } from "@/lib/umami-popular-services";

type PopularServicesResponse = {
  success: boolean;
  data?: {
    startAt: number;
    endAt: number;
    services: Awaited<ReturnType<typeof fetchPopularServiceViews>>;
  };
  error?: string;
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<PopularServicesResponse>> {
  const { searchParams } = new URL(request.url);
  const days = Math.min(
    Math.max(Number(searchParams.get("days") ?? 30), 1),
    365
  );
  const limit = Math.min(
    Math.max(Number(searchParams.get("limit") ?? 10), 1),
    100
  );

  const endAt = Date.now();
  const startAt = endAt - days * 86_400_000;

  try {
    const services = await fetchPopularServiceViews({ startAt, endAt, limit });
    return NextResponse.json({
      success: true,
      data: { startAt, endAt, services },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 502 }
    );
  }
}
