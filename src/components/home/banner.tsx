import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] w-full flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise bay surrounded by lush green hills"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-4xl font-light leading-[1.1] text-white sm:text-6xl md:text-7xl">
          <span className="block">Discover Your</span>
          <span className="block">Next Adventure</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#"
            className="flex h-14 items-center gap-4 rounded-md bg-brand py-2 pl-7 pr-2 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-strong"
          >
            Explore Now
            <span className="grid h-10 w-10 place-items-center rounded bg-black/15">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
          <Link
            href="#"
            className="flex h-14 items-center rounded-md border border-white/30 bg-white/20 px-8 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="flex w-full flex-col bg-white/20 backdrop-blur-md sm:flex-row">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex-1 border-b border-white/25 px-7 py-3 sm:border-b-0 sm:border-r"
          >
            <p className="text-[15px] font-semibold leading-snug text-white">
              {field.label}
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-white/75">
              {field.value}
            </p>
          </div>
        ))}
        <button
          type="button"
          className="flex w-full items-center justify-center bg-brand px-12 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-strong sm:w-auto"
        >
          Search
        </button>
      </div>
    </section>
  );
}
