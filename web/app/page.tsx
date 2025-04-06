import { Box } from "@mui/material";
import Filters from "./components/filters";
import RentalCard from "./components/rentalCard";
import Map from "./components/map";
import { getListings } from "@/lib/database/listing";


export default async function Home() {
  const listings = await getListings();
  if (!listings) {
    return <div>Error loading listings</div>;
  }

  return (
    <div>
      <Filters />

      <div className="w-full h-800 flex">
        <div className="flex-grow h-150">
          <Map address_streets={listings.map(listing => listing.address)} />
        </div>

        <Box width="33%" maxWidth={345} gap={2} margin={2} display="flex" flexDirection="column" >
          {listings.map((listing) => (
            <RentalCard
              key={listing.id}
              address={listing.address}
              rent={listing.month_rent}
              availableDate={listing.availability_start.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
              image=''
            />
          ))}
        </Box>
      </div>
    </div>
  );
}
