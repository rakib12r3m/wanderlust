"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Eye,
  Tag,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

/** Used when the API's imageUrl is missing or not a loadable image. */
const FALLBACK_IMAGE = "/images/Banner.png";

export type Booking = {
  _id: string;
  /** Destination name — spread into the booking document when it was created. */
  name?: string;
  price?: string | number;
  imageUrl?: string;
  departureDate?: string;
  status?: string;
};

type BookingStatus = "confirmed" | "pending";

const STATUS_META: Record<
  BookingStatus,
  { label: string; className: string; Icon: typeof CircleCheck }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-green-100 text-green-700",
    Icon: CircleCheck,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700",
    Icon: Clock,
  },
};

function getStatus(status?: string): { label: string; className: string; Icon: typeof CircleCheck } {
  const key = (status ?? "confirmed").toLowerCase() as BookingStatus;
  return STATUS_META[key] ?? STATUS_META.confirmed;
}

/** "2026-05-15" / ISO string -> "May 15, 2026" (timezone-safe for date-only values). */
function formatDepartureDate(value?: string) {
  if (!value) return "Not specified";

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  const date = dateOnly
    ? new Date(Date.UTC(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3])))
    : new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function BookingCard({ booking }: { booking: Booking }) {
  const [imageSrc, setImageSrc] = useState(booking.imageUrl || FALLBACK_IMAGE);
  const { label, className, Icon } = getStatus(booking.status);
  const name = booking.name ?? "Your booking";

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:gap-6">
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-auto sm:w-64">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(min-width: 640px) 256px, 100vw"
          className="object-cover"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Badge className={cn("h-6 gap-1.5 px-2.5", className)}>
          <Icon />
          {label}
        </Badge>

        <h2 className="mt-3 text-2xl font-bold tracking-tight">{name}</h2>

        <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" />
            Departure: {formatDepartureDate(booking.departureDate)}
          </p>
          <p className="flex items-center gap-2">
            <Tag className="size-4 shrink-0" />
            Booking ID: {booking._id}
          </p>
        </div>

        <p className="mt-4 text-3xl font-bold text-brand sm:mt-auto sm:pt-4">
          ${booking.price ?? 0}
        </p>
      </div>

      <div className="flex items-center gap-3 sm:items-end">
        <Button
          variant="outline"
          className="border-destructive/30 text-destructive hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 data-icon="inline-start" />
          Cancel
        </Button>

        <Link
          href={`/destinations/${booking._id}`}
          className={buttonVariants({
            className: "bg-brand text-white hover:bg-brand-strong",
          })}
        >
          <Eye data-icon="inline-start" />
          View
        </Link>
      </div>
    </article>
  );
}

export function MyBookingCards({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <p className="text-lg font-medium">No bookings yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          When you book a trip, it will show up here.
        </p>
        <Link
          href="/destinations"
          className={buttonVariants({ className: "mt-4 bg-brand text-white hover:bg-brand-strong" })}
        >
          Explore Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
