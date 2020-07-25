import * as zlib from 'zlib';
import * as util from 'util';
import * as stream from 'stream';
import * as fs from 'fs';

const pipeline = util.promisify(stream.pipeline);

async function run() {
  await pipeline(
    fs.createReadStream('files/empty.tar'),
    zlib.createGzip(),
    fs.createWriteStream('files/archive.tar.gz'),
  );
  console.log('Pipeline succeeded.');
}

run().catch((e) => console.error(e));
