import { RowDataPacket } from "mysql2/promise";

export default class Feature {
    id: number;
    feature: string;
    color: string;
    created_at: Date;

    constructor(
        feature: string,
        color: string,
        created_at?: Date,
        id?: number
    ) {

        this.id = id || 0;
        this.feature = feature;
        this.color = color;
        this.created_at = created_at || new Date();
    }
}

export interface DB_Feature extends RowDataPacket {
    id: number;
    feature: string;
    color: string;
    created_at: string;
};

export function extractFeatureFromRow(row: DB_Feature): Feature {
    const feature = new Feature(
        row.feature,
        row.color,
        new Date(row.created_at),
        row.id
    );
  
    return feature;
}
  
