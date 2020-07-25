import { Readable, PassThrough, pipeline, Transform } from 'stream';
import * as streamToPromise from 'stream-to-promise';
import * as util from 'util';

const pipelineAsync = util.promisify(pipeline);
const USD2EUR_CONVERSION_FACTOR = 1.2;

const transactions = [
  { amount: 100 },
  { amount: 200 },
  { amount: 330 },
  { amount: 40 },
  { amount: 50 },
];

const readable = Readable.from(transactions);

const filter = (fn, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,

    transform(chunk, encoding, callback) {
      let take;
      try {
        take = fn(chunk);
      } catch (e) {
        return callback(e);
      }
      return callback(null, take ? chunk : undefined);
    },
  });

const map = (fn, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,

    transform(chunk, encoding, callback) {
      let res;
      try {
        res = fn(chunk);
      } catch (e) {
        return callback(e);
      }
      callback(null, res);
    },
  });

const reduce = (fn, acc, options = {}) =>
  new Transform({
    objectMode: true,
    ...options,

    transform(chunk, encoding, callback) {
      try {
        acc = fn(acc, chunk);
      } catch (e) {
        return callback(e);
      }
      return callback();
    },

    flush(callback) {
      callback(null, acc);
    },
  });

(async () => {
  const resultStream = new PassThrough({ objectMode: true });
  const result = streamToPromise(resultStream);

  await pipelineAsync(
    readable,

    map((transaction) => transaction.amount * USD2EUR_CONVERSION_FACTOR),
    filter((amount) => amount > 100),
    reduce((sum, amount) => sum + amount, 0),

    resultStream,
  );

  console.log(await result);
})();
