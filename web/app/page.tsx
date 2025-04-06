'use client'
import Filters from "./components/filters";
import RentalCard from "./components/rentalCard";
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

export default function Home() {
  return (
    <div>
      <Filters />

      <div className="w-full h-800 bg-amber-300 flex">
        <div className="w-1/2 h-150 bg-amber-400">
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
              defaultZoom={13}
              defaultCenter={{ lat: 44.578994, lng: -123.274673 }}
              onCameraChanged={ (ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
              }
              >
            {/* <PoiMarkers pois={locations} /> */}
            </Map>
            <h1>Hello</h1>
          </APIProvider>
        </div>

        <Box width="33%" maxWidth={345} gap={2} margin={2} display="flex" flexDirection="column" >
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
          <RentalCard />
        </Box>

      </div>
    </div>
  );
}
