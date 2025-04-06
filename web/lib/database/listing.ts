'use server';

import Listing, { DB_Listing, extractListingFromRow } from '@/lib/model/listing';
import { execute, query } from './db_connect';

export async function createListing(list: Listing): Promise<boolean> {
    const sql = `
        INSERT INTO \`listing\`(
            \`month_rent\`,
            \`address\`,
            \`campus_walk_time\`,
            \`campus_bike_time\`,
            \`description\`,
            \`availability_start\`,
            \`availability_end\`
        )
        VALUES (
            :month_rent, 
            :address, 
            :campus_walk_time, 
            :campus_bike_time,
            :description,
            :availability_start,
            :availability_end
        );
    `;

    const result = await execute(sql, list);

    return !!result;
}


export async function getListings(): Promise<Listing[] | false> {
    const sql = 'SELECT * FROM \`listing\`;';

    const result = await query<DB_Listing>(sql, {});

    if (!result) 
        return false;

    return result.map(extractListingFromRow);
}
