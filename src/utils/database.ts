import { Connection, createConnection } from "typeorm";
import { TValue } from "../entities/TValue";
require('dotenv').config()

export async function createConn() { 
    return await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [
            TValue,
        ],
        migrations: [
            TValue,
        ],
        synchronize: true, // true in productuion only for testing
                           // not recommanded
        ssl: {rejectUnauthorized: false}
    });
}