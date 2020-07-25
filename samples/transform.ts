import * as fs from 'fs';
import { Transform, TransformCallback } from 'stream';

const SOURCE_FILE = 'files/source.txt';
const RESULT_FILE = 'files/result.txt';

const upperCaseTransformer = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

class UpperCaseTransformer extends Transform {
  _transform(
    chunk: Buffer,
    encoding: string,
    callback: TransformCallback,
  ): void {
    callback(null, chunk.toString().toUpperCase());
  }
}

const stream = fs
  .createReadStream(SOURCE_FILE)
  .pipe(upperCaseTransformer)
  .pipe(fs.createWriteStream(RESULT_FILE));
