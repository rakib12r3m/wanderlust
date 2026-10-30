"use client";
import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const pageLinks = [
  { label: "Home", href: "/", active: false },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "Add Destination", href: "/add-destination", active: false },
  { label: "My Bookings", href: "/my-bookings", active: false },
];

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white shadow-sm">
      <nav className="relative flex h-16 items-center justify-between px-7">
        <ul className="hidden items-center gap-7 text-[15px] font-medium text-neutral-800 md:flex">
          {pageLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-[#00A8E8]",
                  link.active
                    ? "border-b-2 border-[#00A8E8] pb-0.5 font-medium text-[#00A8E8]"
                    : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-[26px] font-bold text-brand"
        >
          Wanderlast
        </Link>

        <ul className="hidden items-center gap-6 text-[15px] text-neutral-800 sm:flex">
          <li>
            <Link
              href="#"
              className="flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </li>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user?.email}</p>
                    <Button onClick={handleSignOut} variant={"destructive"}>
                      Sign-out
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              {authLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
