import Image from "next/image";
import { ShieldCheck } from "lucide-react";

const reasons = [
  {
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
    icon: <ShieldCheck className="h-12 w-12 text-brand" />,
  },
  {
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
    icon: (
      <Image
        src="/images/MapTrifold.png"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12"
      />
    ),
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
    icon: (
      <Image
        src="/images/Headset.png"
        alt=""
        width={48}
        height={48}
        className="h-12 w-12"
      />
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full bg-[#e0f7fa] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-light text-neutral-900 sm:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-lg border border-neutral-100 bg-white p-7 shadow-sm"
            >
              {reason.icon}
              <h3 className="mt-5 text-2xl font-light text-neutral-900">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
