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
      synchronize: process.env.ENV === 'PROD' ? false : true,
      ssl: process.env.ENV === 'PROD' ? {rejectUnauthorized: true} : false
      // check recommanded params for SSL
    });
}