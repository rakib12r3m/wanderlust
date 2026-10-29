import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  initials: string;
  gradient: string;
};

// When real photos arrive, replace the `gradient` placeholder div below with
// next/image using the same 5:6 aspect (see `sm:aspect-[5/6]`).
const testimonials: Testimonial[] = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    initials: "MC",
    gradient: "from-[#f7489b] to-[#7d8ff5]",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    initials: "SJ",
    gradient: "from-teal-400 to-slate-500",
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Carousel opts={{ align: "start", loop: true }}>
          <div className="flex items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl font-light text-neutral-900 sm:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-base text-neutral-600">
                Real experiences from our happy travelers
              </p>
            </div>

            {/* static: flow these in the header instead of the default
                absolute side-anchored position; size-14 matches the design's
                56px circles. */}
            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <CarouselPrevious className="static size-14 disabled:opacity-100" />
              <CarouselNext className="static size-14 disabled:opacity-100" />
            </div>
          </div>

          <CarouselContent className="mt-6">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2">
                <article className="flex h-full flex-col gap-5 rounded-lg border border-neutral-200 bg-white p-5 sm:flex-row sm:gap-6">
                  <div className="flex flex-1 flex-col">
                    <p className="text-[17px] leading-normal text-neutral-900">
                      {testimonial.quote}
                    </p>
                    <p className="mt-auto pt-8 text-[15px] text-brand">
                      — {testimonial.name}
                    </p>
                    <p className="mt-1 text-[13px] text-neutral-500">
                      {testimonial.location}
                    </p>
                  </div>

                  <div
                    className={`flex h-48 w-full shrink-0 items-center justify-center bg-gradient-to-br sm:h-auto sm:w-44 sm:aspect-[5/6] ${testimonial.gradient}`}
                    aria-hidden="true"
                  >
                    <span className="text-3xl font-light text-white">
                      {testimonial.initials}
                    </span>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
