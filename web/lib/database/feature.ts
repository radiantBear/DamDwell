'use server';

import { DB_Feature, extractFeatureFromRow, default as Feature, } from '@/lib/model/feature';
import { query } from './db_connect';

export async function getFeatures(): Promise<Feature[] | false> {
    const sql = 'SELECT * FROM \`feature\`;';

    const result = await query<DB_Feature>(sql, {});

    if (!result) 
        return false;

    return result.map(extractFeatureFromRow);
}
