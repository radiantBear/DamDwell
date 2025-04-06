'use server';

import Listing from '@/lib/model/listing';
import { execute } from './db_connect';

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
