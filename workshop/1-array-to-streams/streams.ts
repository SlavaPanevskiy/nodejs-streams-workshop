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

const filter = (fn, options = {}) => {
  // ToDo Add implementation
};

const map = (fn, options = {}) => {
  // ToDo Add implementation
};

const reduce = (fn, acc, options = {}) => {
    // ToDo Add implementation
  };

(async () => {
  await pipelineAsync(
    readable,
    // map((transaction) => transaction.amount * USD2EUR_CONVERSION_FACTOR),
    // filter((amount) => amount > 100),
    // reduce((sum, amount) => sum + amount, 0),
    process.stdout
  );
})();
