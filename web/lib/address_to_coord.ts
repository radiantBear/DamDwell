export async function addressToCoordinates(address: {street: string, city: string, state: string, zip: string}) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.street},+${address.city},+${address.state},${address.zip}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
    const data = await response.json()

    return {
        position: {
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
        }
    }
}