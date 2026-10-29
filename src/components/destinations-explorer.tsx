"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { cn } from "cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
};

/** The API doesn't provide a rating yet — fall back to the design's 4.5 badge. */
const FALLBACK_RATING = 4.5;
/** Used when the API's imageUrl is missing or not a loadable image. */
const FALLBACK_IMAGE = "/images/Banner.png";

const PRICE_RANGES: {
  value: string;
  label: string;
  min: number;
  max: number;
}[] = [
  { value: "all", label: "All Prices", min: 0, max: Infinity },
  { value: "under-1000", label: "Under $1,000", min: 0, max: 999 },
  { value: "1000-1500", label: "$1,000 - $1,500", min: 1000, max: 1500 },
  { value: "1500-2000", label: "$1,500 - $2,000", min: 1500, max: 2000 },
  { value: "over-2000", label: "Over $2,000", min: 2000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
];

function DestinationCard({ destination }: { destination: Destination }) {
  const [imageSrc, setImageSrc] = useState(
    destination.imageUrl || FALLBACK_IMAGE,
  );
  const rating = destination.rating ?? FALLBACK_RATING;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
        <Image
          src={imageSrc}
          alt={destination.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
        />
        <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm">
          {rating}
          <Star className="size-3 fill-foreground text-foreground" />
        </span>
      </div>

      <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="size-3.5" />
        {destination.country}
      </p>

      <div className="mt-1.5 flex items-baseline justify-between gap-2">
        <h2 className="text-base font-medium">{destination.name}</h2>
        <p className="shrink-0">
          <span className="text-lg font-semibold">${destination.price}</span>
          <span className="text-xs text-muted-foreground">/Person</span>
        </p>
      </div>

      <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
        <CalendarDays className="size-3.5" />
        {destination.duration}
      </p>

      <Link
        href={`/destinations/${destination._id}`}
        className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand transition-colors hover:text-brand-strong"
      >
        Book Now
        <ArrowUpRight className="size-3.5" />
      </Link>
    </article>
  );
}

export function DestinationsExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(destinations.map((d) => d.category))).sort(),
    [destinations],
  );

  const visible = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.value === priceRange);

    const list = destinations.filter((d) => {
      const matchesCategory = !category || d.category === category;
      const price = Number(d.price);
      const matchesPrice = !range || (price >= range.min && price <= range.max);
      return matchesCategory && matchesPrice;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => Number(a.price) - Number(b.price));
      case "price-desc":
        return [...list].sort((a, b) => Number(b.price) - Number(a.price));
      case "name-asc":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [destinations, category, priceRange, sort]);

  if (destinations.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
        <p className="text-lg font-medium">No destinations yet</p>
        <p className="text-sm text-muted-foreground">
          Add your first travel package to see it listed here.
        </p>
        <Link
          href="/add-destination"
          className="mt-2 text-sm font-semibold uppercase tracking-wide text-brand transition-colors hover:text-brand-strong"
        >
          Add Destination
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger
            id="filter-category"
            aria-label="Filter by category"
            className={cn(
              "w-full justify-between rounded-lg border-0 bg-muted px-3 uppercase tracking-wide",
              category ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={priceRange}
          onValueChange={(value) => setPriceRange(value)}
        >
          <SelectTrigger
            id="filter-price"
            aria-label="Filter by price range"
            className={cn(
              "w-full justify-between rounded-lg border-0 bg-muted px-3 uppercase tracking-wide",
              priceRange ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(value) => setSort(value)}>
          <SelectTrigger
            id="filter-sort"
            aria-label="Sort destinations"
            className={cn(
              "w-full justify-between rounded-lg border-0 bg-muted px-3 uppercase tracking-wide",
              sort ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing {visible.length} destination{visible.length === 1 ? "" : "s"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No destinations match the selected filters.
        </p>
      ) : (
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </>
  );
}
