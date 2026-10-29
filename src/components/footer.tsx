import Link from "next/link";
// import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#" },
  { label: "My Bookings", href: "#" },
  { label: "My Profile", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const contactDetails = ["786 901 1622", "info@wandarland.com"];

// `new Date()` can't be prerendered directly (its value changes every render),
// so it lives in a cached scope instead. `max` revalidates monthly, which is
// more than enough to keep a copyright year fresh.
async function CopyrightYear() {
  // "use cache";
  // cacheLife("max");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-6xl font-bold tracking-tight sm:text-7xl">
          Wanderlast
        </h2>
        <p className="mt-3 text-sm text-neutral-300 sm:text-base">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-base font-normal text-neutral-100">
              NEWSLETTER
            </h3>
            <p className="mt-3 text-sm text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex max-w-xs items-center rounded-md bg-neutral-800 pr-3">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="h-12 w-full bg-transparent pl-4 text-sm text-white placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="shrink-0 transition-colors hover:text-brand"
              >
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-base font-normal text-neutral-100">
              QUICK LINKS
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-normal text-neutral-100">SUPPORT</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-normal text-neutral-100">
              CONTACT US
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              {contactDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="text-sm text-neutral-400">
              © <CopyrightYear /> Wanderlast. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                aria-label="X"
                className="text-neutral-300 transition-colors hover:text-brand"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-neutral-300 transition-colors hover:text-brand"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-neutral-300 transition-colors hover:text-brand"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
