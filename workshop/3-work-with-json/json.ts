import * as fs from 'fs';
import * as JSONStream from 'JSONStream';
import * as util from 'util';
import { Readable, pipeline } from 'stream';

const pipelineAsync = util.promisify(pipeline);

const source = Readable.from([
  { name: 'a' },
  { name: 'b' },
  { name: 'c' },
  { name: 'd' },
  { name: 'e' },
  { name: 'f' },
  { name: 'g' },
]);

const stringlifyStream = JSONStream.stringify(
  `{"meta": "test", "data": [`,
  ',',
  ']}',
);

(async () => {
  await pipelineAsync(
    source,
    stringlifyStream,
    fs.createWriteStream('files/json-result.json'),
  );
})().catch(console.error);

// const result  = {
//     meta: "test",
//     data: [
//         { name: 'a' },
//         { name: 'b' },
//         { name: 'c' },
//         { name: 'd' },
//         { name: 'e' },
//         { name: 'f' },
//         { name: 'g' }
//     ]
// };
