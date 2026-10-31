import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedCarousel } from "@/components/home/featured-carousel";
import type { Destination } from "@/components/destinations/destinations-explorer";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/featured-destinations/`;

async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch featured destinations: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch featured destinations:", error);
    return [];
  }
}

const Featured = async () => {
  const destinations = await getFeaturedDestinations();

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-5xl">
              Featured Destinations
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex shrink-0 items-center gap-3 rounded-md border border-brand px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-brand transition-colors hover:bg-brand/10"
          >
            All Destinations
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {destinations.length > 0 ? (
          <FeaturedCarousel destinations={destinations} />
        ) : (
          <p className="mt-8 text-sm text-muted-foreground">
            No featured destinations yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
};

export default Featured;
