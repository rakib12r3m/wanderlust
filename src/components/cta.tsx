import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative isolate flex w-full items-center justify-center overflow-hidden py-24">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* CTA.png is bright; the design shows it heavily darkened. */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="flex flex-col items-center px-4 text-center">
        <h2 className="text-4xl font-light text-white sm:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/85 sm:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="#"
          className="mt-8 inline-flex h-12 items-center gap-8 rounded-md bg-white px-6 text-sm font-semibold uppercase tracking-wider text-neutral-900 shadow-md transition-colors hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
