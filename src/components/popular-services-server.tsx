import { PopularServicesList } from "@/components/popular-services";
import { fetchPopularPages } from "@/lib/umami-popular-services";

export async function PopularServices() {
  const pages = await fetchPopularPages({
    startAt: Date.now() - 30 * 86_400_000,
    endAt: Date.now(),
    // type: "form",
    limit: 6,
  });

  return <PopularServicesList services={pages} />;
}
