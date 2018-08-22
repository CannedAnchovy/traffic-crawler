import fs from 'fs';
import util from 'util';

export const readFile = util.promisify(fs.readFile);
export const writeFile = util.promisify(fs.writeFile);
export const access = util.promisify(fs.access);
