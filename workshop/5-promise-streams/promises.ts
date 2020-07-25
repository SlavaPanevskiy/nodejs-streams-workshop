import { Readable } from 'stream';
const bluebird = require('bluebird'),
  request = require('request'),
  path = require('path'),
  createWriteStream = require('fs').createWriteStream,
  ps = require('promise-streams');

bluebird.promisifyAll(request);

const download = (url) =>
  ps.wait(
    request(url).pipe(createWriteStream('files/images/' + path.basename(url))),
  );

Readable.from([
  'https://i.imgur.com/7jGz7nX.png',
  'https://i.imgur.com/zATRlXo.jpg',
])
  .pipe(ps.map({ concurrent: 4 }, (imgurl) => download(imgurl)))
  .promise()
  .then(() => console.log('Done'))
  .catch((err) => console.error(err));
