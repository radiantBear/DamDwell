import { getFeatures } from '@/lib/database/feature';

export async function GET() {
    const result = await getFeatures();

    if (!result) 
        return new Response('Could not get features', { status: 500 });
    
    return new Response(JSON.stringify(result), { status: 200 })
}
