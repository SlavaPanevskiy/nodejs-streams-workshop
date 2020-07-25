import { Readable } from 'stream';

const lowLevelReader = () => Math.random().toPrecision(1).toString();

class InStream extends Readable {
  _read(size) {
    console.log(size);
    for (let i = 0; i < size; i++) {
      this.push(lowLevelReader());
    }
  }
}

const inStream = new InStream({ objectMode: true });
inStream.pipe(process.stdout);
