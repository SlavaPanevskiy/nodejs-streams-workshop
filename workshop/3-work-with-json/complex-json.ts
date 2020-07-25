import { finished, Readable } from 'stream';
import * as JSONStream from 'JSONStream';
import * as util from 'util';
import * as fs from 'fs';

const finishedAsync = util.promisify(finished);

const dataItems = Readable.from([
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
  { name: 'd' },
  { name: 'e' },
  { name: 'f' },
  { name: 'g' },
]);

const listItems = Readable.from([
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
  { name: 'd' },
  { name: 'e' },
  { name: 'f' },
  { name: 'g' },
]);

const stringlifyStream = () => JSONStream.stringify('[', ',', ']');

(async () => {
  const fileStream = fs.createWriteStream('files/json-result.json');

  fileStream.write(`{ "data": `);

  const stringlifyData = stringlifyStream();
  dataItems.pipe(stringlifyData).pipe(fileStream, { end: false });
  await finishedAsync(stringlifyData);

  fileStream.write(`, "property": "4"`);
  fileStream.write(`, "another-field": "5"`);
  fileStream.write(`, "list": `);

  const stringlifyList = stringlifyStream();
  listItems.pipe(stringlifyList).pipe(fileStream, { end: false });
  await finishedAsync(stringlifyList);

  fileStream.write(`,  "meta": "metadata"`);
  fileStream.end('}');
})().catch(console.error);

// const result = {
//   "data": [
//     {"name": 'a'},
//     {"name": 'b'},
//     {"name": 'c'},
//     {"name": 'd'},
//     {"name": 'e'},
//     {"name": 'f'},
//     {"name": 'g'}
//   ],
//   "property": "4",
//   "another-field": "5",
//   "list": [
//     {"name": 'a'},
//     {"name": 'b'},
//     {"name": 'c'},
//     {"name": 'd'},
//     {"name": 'e'},
//     {"name": 'f'},
//     {"name": 'g'}
//   ],
//   "meta": "metadata"
// };
