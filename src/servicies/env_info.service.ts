import { getConnection } from "typeorm"

const millisecondsToNormalTime = (milliseconds: number): string => {
  let seconds: number = 0,
    minutes: number = 0,
    hours: number = 0,
    days: number = 0;
  while(milliseconds >= 86400000) {
    milliseconds -= 86400000;
    days++;
  }
  while (milliseconds >= 3600000) {
    milliseconds -= 3600000;
    hours++;
  }
  while (milliseconds >= 60000) {
    milliseconds -= 60000;
    minutes++;
  }
  while (milliseconds >= 1000) {
    milliseconds -= 1000;
    seconds++;
  }
  return `${days} days ${hours} hours ${minutes} minutes and ${seconds} seconds` ;
};

export const getDatabaseSize = async (): Promise<string> => {
  const databaseName =
    process.env.DATABASE_URL?.split('/')[process.env.DATABASE_URL.split('/').length - 1];
    console.log(databaseName);
    return await getConnection().query(`
    SELECT pg_size_pretty(pg_database_size($1));
  `, [databaseName]);
}

export const getServerRuntime = (startTime: number): string => {
  return millisecondsToNormalTime(Date.now() - startTime);
};