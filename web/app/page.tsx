'use client';
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Filters from "./components/filters";
import RentalCard from "./components/rentalCard";
import {Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';


const addresses = [
  {
    street: "1141+NW+26th+Street",
    city: "Corvallis",
    state: "OR",
    zip: "97330"
  },
  {
    street: "2305 NW Monroe Ave",
    city: "Corvallis",
    state: "OR",
    zip: "97330"
  }
]

export default function Home() {
  const [markers, setMarkers] = useState<{position: {lat: number, lng: number}}[]>([])

  useEffect(() => {
    const fetchData = async () => {
      addresses.forEach(async (address) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.street},+${address.city},+${address.state},${address.zip}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
        const data = await response.json()
        console.log(data)
        setMarkers(prevMarkers => [...prevMarkers, {
          position: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
          }
        }])
      })
    }
    fetchData()
  }, [])

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

              {markers.map((marker) => (
                <Marker
                  position={marker.position}
                />
              ))}
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
