import {createConnection } from "typeorm";
import { Board } from "../entities/Board";
import { TValue } from "../entities/TValue";
require('dotenv').config()

export async function createDBConnection() { 
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
        synchronize: process.env.ENV === 'PROD' ? false : true, // true in productuion only for testing
                           // not recommanded
        ssl: process.env.ENV === 'PROD' ? {rejectUnauthorized: false} : false
        // check recommanded params for db
      });
}