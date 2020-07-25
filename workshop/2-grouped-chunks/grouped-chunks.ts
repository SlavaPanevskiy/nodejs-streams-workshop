const { Readable } = require('stream');
import { Transform, TransformCallback } from 'stream';

class AggregateTransformer extends Transform {
  // ToDo Add implementation
}

const transformer = new AggregateTransformer();

Readable.from([
  { name: 'a' },
  { name: 'b' },
  { name: 'b' },
  { name: 'b' },
  { name: 'b' },
  { name: 'b' },
  { name: 'b' },
  { name: 'c' },
])
  .pipe(transformer)
  .pipe(process.stdout);
