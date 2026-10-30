import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, Pencil, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
 
  DestinationHero,
} from "@/components/destinations/destination-details";
import EditDestinationDialog from "@/components/destinations/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destinations/DeleteDestinationDialog";
import { BookingCard } from "@/components/booking-card/BookingCard";

// The API is a local dev server, so render at request time instead of
// baking the data into the build (the API isn't reachable during `next build`).
export const dynamic = "force-dynamic";

const API_URL = "http://localhost:8000/destination";

/** Shape returned by the local API, plus optional fields it may not send yet. */
type Destination = {
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
  reviews?: number;
  highlights?: string[];
};

/** The API doesn't send these yet — fall back to the design's values. */
const FALLBACK_RATING = 4.9;
const FALLBACK_REVIEWS = 234;
const FALLBACK_HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];

async function getDestination(id: string): Promise<Destination | null> {
  try {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
      console.error(`Failed to fetch destination: ${res.status}`);
      return null;
    }

    // The API can return 200 with an empty body — don't call .json() on that.
    const text = await res.text();
    if (!text.trim()) return null;

    return JSON.parse(text) as Destination;
  } catch (error) {
    console.error("Failed to fetch destination:", error);
    return null;
  }
}

/** "7 days/6 night" -> "7 Days / 6 Nights". */
function formatDuration(raw: string): string {
  return raw
    .split("/")
    .map((part) =>
      part
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(" / ");
}

function DestinationNotFound() {
  return (
    <main className="flex-1 w-full">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light">Destination not found</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t find this travel package. It may have been removed.
        </p>
        <Link
          href="/destinations"
          className={buttonVariants({
            variant: "outline",
            className: "mt-2",
          })}
        >
          <ArrowLeft data-icon="inline-start" />
          Back to Destinations
        </Link>
      </div>
    </main>
  );
}

const DestinationDetailsPage = async ({ params }: PageProps<"/destinations/[id]">) => {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) {
    return <DestinationNotFound />;
  }

  const rating = destination.rating ?? FALLBACK_RATING;
  const reviews = destination.reviews ?? FALLBACK_REVIEWS;
  const highlights = destination.highlights ?? FALLBACK_HIGHLIGHTS;

  return (
    <main className="flex-1 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            {/* TODO: no edit route exists yet. */}
           
            <EditDestinationDialog destination={destination}/>
            
            <DeleteDestinationDialog id={id}/>
          </div>
        </div>

        {/* Hero image */}
        <div className="mt-6">
          <DestinationHero
            src={destination.imageUrl}
            alt={destination.name}
          />
        </div>

        {/* Content + booking card */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {destination.country}
            </p>

            <h1 className="mt-2 text-4xl font-light tracking-tight sm:text-5xl">
              {destination.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-green-600 text-green-600" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground">({reviews} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4" />
                {formatDuration(destination.duration)}
              </span>
            </div>

            <section className="mt-8">
              <h2 className="text-2xl font-light">Overview</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {destination.description}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-light">Highlights</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {destination.description}
              </p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <BookingCard 
            destination={destination}
              // price={destination.price}
              // departureDate={destination.departureDate}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
