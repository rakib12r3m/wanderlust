import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  MyBookingCards,
  type Booking,
} from "@/components/booking-card/MyBookingCards";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/my-bookings`;

async function getBookings(email?: string | null): Promise<Booking[]> {
  if (!email) return [];

  try {
    const res = await fetch(`${API_URL}/${email}`);

    if (!res.ok) {
      console.error(`Failed to fetch bookings: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session, 'from server side api');
  
  const user = session?.user;

  const bookings = await getBookings(user?.email);
  console.log(bookings, 'from my-bookings');
  

  return (
    <main className="flex-1 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          My Bookings
        </h1>
        <p className="mt-3 text-muted-foreground">
          Manage and view your upcoming travel plans
        </p>

        <div className="mt-8">
          <MyBookingCards bookings={bookings} />
        </div>
      </div>
    </main>
  );
};

export default MyBookingPage;
