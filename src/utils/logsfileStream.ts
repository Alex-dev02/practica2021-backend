import fileStream from 'fs';

export let stream = fileStream.createWriteStream('logs.txt', {flags: 'a'}); 

