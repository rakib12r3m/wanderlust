'use client';
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IDestination } from "@/lib/types/destination";
import { authClient } from "@/lib/auth-client";


export function BookingCard({destination}:{destination:IDestination}) {
  // const [date, setDate] = useState(destination.departureDate);
  const [booked, setBooked] = useState(false);


  const { data: session } = authClient.useSession();
    const user = session?.user; 

    const handleBooking =async (e)=> {
        e.preventDefault()
        const departureDate = e.target.departureDate.value 
     
        
        const data = {
          username: user?.name,
          email: user?.email,
          image: user?.image,
          ...destination,
          departureDate: departureDate,
          bookingDate: new Date()
        }
       
        const res = await fetch(`http://localhost:8000/booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        const bookingRes = await res.json()
        console.log(bookingRes);
        
        
        

    }
  

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-semibold text-brand">${destination.price}</p>
      <p className="text-sm text-muted-foreground">per person</p>

<form onSubmit={handleBooking}>
      <div className="mt-5 border-t pt-5">
        <label htmlFor="departure-date" className="sr-only">
          Departure date
        </label>
        <Input
          id="departure-date"
          type="date" 
          name="departureDate"
          defaultValue={destination.departureDate}
          onChange={(e) => {
            setDate(e.target.value);
            setBooked(false);
          }}
          className="bg-muted"
        />
      </div>

      <Button
        type="submit"
        className="mt-4 h-10 w-full bg-brand text-white hover:bg-brand-strong"
        onClick={() => setBooked(true)}
      >
        Book Now
        <ArrowRight data-icon="inline-end" />
      </Button>
      </form>

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