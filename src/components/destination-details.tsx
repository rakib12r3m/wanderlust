"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Used when the API's imageUrl is missing or not a loadable image. */
const FALLBACK_IMAGE = "/images/Banner.png";

export function DestinationHero({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl bg-muted">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 1100px, 100vw"
        className="object-cover"
        onError={() => setImageSrc(FALLBACK_IMAGE)}
        priority
      />
    </div>
  );
}

export function BookingCard({
  price,
  departureDate,
}: {
  price: string;
  departureDate: string;
}) {
  const [date, setDate] = useState(departureDate);
  const [booked, setBooked] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-semibold text-brand">${price}</p>
      <p className="text-sm text-muted-foreground">per person</p>

      <div className="mt-5 border-t pt-5">
        <label htmlFor="departure-date" className="sr-only">
          Departure date
        </label>
        <Input
          id="departure-date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setBooked(false);
          }}
          className="bg-muted"
        />
      </div>

      <Button
        type="button"
        className="mt-4 h-10 w-full bg-brand text-white hover:bg-brand-strong"
        onClick={() => setBooked(true)}
      >
        Book Now
        <ArrowRight data-icon="inline-end" />
      </Button>

      {booked ? (
        <p className="mt-3 text-center text-sm text-brand-strong" role="status">
          Booking requested — we&apos;ll be in touch!
        </p>
      ) : null}

      <ul className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
        {[
          "Free cancellation up to 7 days",
          "Travel insurance included",
          "24/7 customer support",
        ].map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-green-600" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
