'use client';

import { addressToCoordinates } from '@/lib/address_to_coord';
import {Map as GoogleMap, MapCameraChangedEvent, Marker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export default function Map({ address_streets }: { address_streets: string[] }) {
    const [markers, setMarkers] = useState<{position: {lat: number, lng: number}}[]>([])
    
    useEffect(() => {
        const fetchMarkers = async () => {
            setMarkers(await Promise.all(
            address_streets.map(street => addressToCoordinates({street, city: 'Corvallis', state: 'OR', zip: '97330'}))
            ));
        };

        fetchMarkers();
    }, [address_streets]);
    
    return (<GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 44.578994, lng: -123.274673 }}
        onCameraChanged={ (ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
        >

            {markers.map((marker) => (
            <Marker
                key={`${marker.position.lat}-${marker.position.lng}`}
                position={marker.position}
            />
            ))}
        </GoogleMap>
    );
}