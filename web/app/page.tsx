'use client'
import React, { useState, useEffect } from 'react';
import Filters from "./components/filters";
import RentalCard from "./components/rentalCard";
import {APIProvider, Map, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';


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
        var response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.street},+${address.city},+${address.state},${address.zip}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
        var data = await response.json()
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

                {markers.map((marker) => (
                  <Marker
                    position={marker.position}
                  />
                ))}
            </Map>
            <h1>Hello</h1>
          </APIProvider>
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
