import { RowDataPacket } from "mysql2/promise";

export default class Listing {
    id: number;
    month_rent: number;
    address: string;
    campus_walk_time: number;
    campus_bike_time: number;
    description: string;
    tags: string[];
    availability_start: Date;
    availability_end: Date;
    created_at: Date;
    updated_at: Date;

    constructor(
        month_rent: number,
        address: string,
        campus_walk_time: number,
        campus_bike_time: number,
        description: string,
        tags: string[],
        availability_start: Date,
        availability_end: Date,
        created_at?: Date,
        updated_at?: Date,
        id?: number
    ) {

        this.id = id || 0;
        this.month_rent = month_rent;
        this.address = address;
        this.campus_walk_time = campus_walk_time;
        this.campus_bike_time = campus_bike_time;
        this.description = description;
        this.tags = tags;
        this.availability_start = availability_start;
        this.availability_end = availability_end;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
}

export interface DB_Listing extends RowDataPacket {
    id: number;
    month_rent: number;
    address: string;
    campus_walk_time: number;
    campus_bike_time: number;
    description: string;
    tags: string[];
    availability_start: string;
    availability_end: string;
    created_at: string;
    updated_at: string;
};

export function extractListingFromRow(row: DB_Listing): Listing {
    const feature = new Listing(
        row.month_rent,
        row.address,
        row.campus_walk_time,
        row.campus_bike_time,
        row.description,
        [],
        new Date(row.availability_start),
        new Date(row.availability_end),
        new Date(row.created_at),
        new Date(row.updated_at),
        row.id
    );
  
    return feature;
}
