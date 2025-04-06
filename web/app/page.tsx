import Filters from "./components/filters";
import RentalCard from "./components/rentalCard";

export default function Home() {
  return (
    <div>
      <Filters />

      <div className="w-full h-800 bg-amber-300 flex">
        <div className="w-1/2 h-150 bg-amber-400">
          
        </div>

        <div className="w-1/2 h-150 bg-amber-800 p-2 flex flex-wrap gap-2">
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
        </div>

      </div>
    </div>
  );
}
