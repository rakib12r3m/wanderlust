"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import type { Destination } from "@/components/destinations/destinations-explorer";

/** The API doesn't provide a rating yet — fall back to the design's 4.5 badge. */
const FALLBACK_RATING = 4.5;
/** Used when the API's imageUrl is missing or not a loadable image. */
const FALLBACK_IMAGE = "/images/Banner.png";

/** "3 days/2 nights" -> "3 Days/2 Nights", the way the design shows it. */
function formatDuration(raw: string): string {
  return raw.replace(/\b\w/g, (char) => char.toUpperCase());
}

function FeaturedCard({ destination }: { destination: Destination }) {
  const [imageSrc, setImageSrc] = useState(
    destination.imageUrl || FALLBACK_IMAGE,
  );
  const rating = destination.rating ?? FALLBACK_RATING;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-muted">
        <Image
          src={imageSrc}
          alt={destination.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
          {rating}
          <Star className="size-3 fill-foreground text-foreground" />
        </span>
      </div>

      <p className="mt-10 flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="size-3.5" />
        {destination.country}
      </p>

      <div className="mt-1.5 flex items-baseline justify-between gap-2">
        <h3 className="text-xl font-medium">{destination.name}</h3>
        <p className="shrink-0">
          <span className="text-xl font-semibold">${destination.price}</span>
          <span className="text-xs text-muted-foreground">/Person</span>
        </p>
      </div>

      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarDays className="size-3.5" />
        {formatDuration(destination.duration)}
      </p>

      <Link
        href={`/destinations/${destination._id}`}
        className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand transition-colors hover:text-brand-strong"
      >
        Book Now
        <ArrowUpRight className="size-3.5" />
      </Link>
    </article>
  );
}

/**
 * The design's footer: "1/5" counter, a progress track, and the prev/next
 * round buttons. Must render inside <Carousel /> — it reads the embla api
 * from carousel context instead of a setApi callback, and subscribes to it
 * with useSyncExternalStore so no state is set inside an effect.
 */
function CarouselFooter({ total }: { total: number }) {
  const { api } = useCarousel();

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};

      api.on("select", onChange);
      api.on("reInit", onChange);
      return () => {
        api.off("select", onChange);
        api.off("reInit", onChange);
      };
    },
    [api],
  );

  const selectedIndex = useSyncExternalStore(
    subscribe,
    useCallback(() => api?.selectedScrollSnap() ?? 0, [api]),
    useCallback(() => 0, []),
  );

  const step = 100 / total;
  const index = Math.min(Math.max(selectedIndex, 0), total - 1);

  return (
    <div className="mt-8 flex items-center gap-4">
      <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
        {index + 1}/{total}
      </span>

      <div className="relative h-px flex-1 overflow-hidden rounded-full bg-border">
        <div
          className="absolute inset-y-0 rounded-full bg-brand transition-all duration-300"
          style={{ left: `${index * step}%`, width: `${step}%` }}
        />
      </div>

      {/* static: flow these into the footer instead of the default
          absolute side-anchored position; size-9 matches the design's
          36px circles. */}
      <div className="flex shrink-0 items-center gap-3">
        <CarouselPrevious className="static size-9" />
        <CarouselNext className="static size-9" />
      </div>
    </div>
  );
}

export function FeaturedCarousel({
  destinations,
}: {
  destinations: Destination[];
}) {
  return (
    <Carousel opts={{ align: "start", loop: false }} className="mt-6">
      <CarouselContent>
        {destinations.map((destination) => (
          <CarouselItem
            key={destination._id}
            className="basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <FeaturedCard destination={destination} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselFooter total={destinations.length} />
    </Carousel>
  );
}
