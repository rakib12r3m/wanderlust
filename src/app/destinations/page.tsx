import {
  DestinationsExplorer,
  type Destination,
} from "@/components/destinations/destinations-explorer";

// The API is a local dev server, so render at request time instead of
// baking the data into the build (the API isn't reachable during `next build`).
export const dynamic = "force-dynamic";

const API_URL = "http://localhost:8000/destination";

async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      console.error(`Failed to fetch destinations: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return [];
  }
}

const AllDestinationPage = async () => {
  const destinations = await getDestinations();

  return (
    <main className="flex-1 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-3 text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        <DestinationsExplorer destinations={destinations} />
      </div>
    </main>
  );
};

export default AllDestinationPage;
