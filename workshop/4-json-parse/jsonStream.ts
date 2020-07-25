import * as fs from 'fs';
const JSONStream = require('JSONStream');
const es = require('event-stream');

fs.createReadStream('files/couchData.json')
  .pipe(JSONStream.parse('rows.*'))
  .pipe(
    es.mapSync(function (data) {
      console.log(data);
      return data;
    }),
  );
