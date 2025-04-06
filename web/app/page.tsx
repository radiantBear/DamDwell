'use client';
import { Box } from "@mui/material";
import Filters from "./components/filters";
import RentalCard from "./components/rentalCard";
import {Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

export default function Home() {
  return (
    <div>
      <Filters />

      <div className="w-full h-800 flex">
        <div className="flex-grow h-150">
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: 44.578994, lng: -123.274673 }}
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }
            >
          {/* <PoiMarkers pois={locations} /> */}
          </Map>
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
