import { createListing } from '@/lib/database/listing';
import Listing from '@/lib/model/listing';

export async function POST(request: Request) {
    const body = await request.json();

    console.log(body)
    const result = await createListing(new Listing(
        body.cost, 
        body.address,
        0,
        0,
        body.description,
        body.tags,
        body.availabilityStart,
        body.availabilityEnd,
        
    ));

  if (!result) 
    return new Response('Could not create listing', { status: 500 });
  
  return new Response('Listing created', { status: 200 })
}
