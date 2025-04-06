import NewListing from '@/components/new_listing';
import { getFeatures } from '@/lib/database/feature';

export default async function Page() {
    const features = await getFeatures();
    if (!features) {
        return <div>Error loading features</div>;
    }
  
    return (
        <NewListing features={JSON.stringify(features)} />
    );
}
