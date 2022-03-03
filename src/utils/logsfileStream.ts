import fs from 'fs';

export let stream = fs.createWriteStream('logs.txt', {flags: 'a'}); 

