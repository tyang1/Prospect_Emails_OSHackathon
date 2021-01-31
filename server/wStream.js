const stream = require('stream');
const Writable = stream.Writable || require('readable-stream').Writable;
const util = require('util');

/* Writable memory stream */
function WMStrm({ key, options, destination }) {
  // allow use without new operator
  if (!(this instanceof WMStrm)) {
    return new WMStrm({ key, options, destination });
  }
  Writable.call(this, options); // init super
  this.key = key; // save key
  this.destination = destination;
  destination[key] = Buffer.from(''); // empty
}
util.inherits(WMStrm, Writable);

WMStrm.prototype._write = function (chunk, enc, cb) {
  // our memory store stores things in buffers
  var buffer = Buffer.isBuffer(chunk)
    ? chunk // already is Buffer use it
    : new Buffer(chunk, enc); // string, convert

  // concat to the buffer already there
  this.destination[this.key] = Buffer.concat([
    this.destination[this.key],
    buffer,
  ]);
  cb();
};

module.exports = {
  WMStrm,
};
