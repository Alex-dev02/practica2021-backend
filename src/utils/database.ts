import {createConnection } from "typeorm";
import { Board } from "../entities/Board";
import { TValue } from "../entities/TValue";
require('dotenv').config()

export async function createConn() { 
    return await createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [
            TValue,
            Board
        ],
        migrations: [
            TValue,
            Board
        ],
        synchronize: true, // true in productuion only for testing
                           // not recommanded
        //ssl: {rejectUnauthorized: false}
        
    });
}