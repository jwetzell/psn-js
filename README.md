![npm](https://img.shields.io/npm/v/%40jwetzell%2Fposistagenet)
# psn-js
typesecript implementation of the [PosiStageNet protocol](https://github.com/vyv/psn-cpp/blob/master/doc/PosiStageNetprotocol_v2.03_2019_09_09.pdf)


## Install
`npm install --save @jwetzell/posistagenet`

## Usage

### Decode - [example](./examples/psn_client.js)
```
const { Decoder } = require('@jwetzell/posistagenet')
const decoder = new Decoder()

const infoPacketBuffer = new Uint8Array([
  0x56, 0x67, 0x34, 0x80, 0x00, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x03, 0x01,
  0x01, 0x01, 0x00, 0x0b, 0x00, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x20, 0x4e, 0x61, 0x6d, 0x65, 0x02, 0x00, 0x11,
  0x80, 0x01, 0x00, 0x0d, 0x80, 0x00, 0x00, 0x09, 0x00, 0x54, 0x72, 0x61, 0x63, 0x6b, 0x65, 0x72, 0x20, 0x31,
]);
const dataPacketBuffer = new Uint8Array([
  0x55, 0x67, 0x28, 0x80, 0x00, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x03, 0x01,
  0x01, 0x01, 0x00, 0x14, 0x80, 0x01, 0x00, 0x10, 0x80, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x00, 0x80, 0x3f, 0x00, 0x00,
  0x80, 0x3f, 0x00, 0x00, 0x80, 0x3f,
]);

decoder.decode(infoPacketBuffer)
decoder.decode(dataPacketBuffer)

// the system_name from info packets if available
console.log(decoder.system_name)

// map of trackers populated with any data that has been received
// this merges both info and data packet properties into one
console.log(decoder.trackers)

```

### Encode - [example](./examples/psn_server.js)
```
const { Encoder, Tracker } = require('@jwetzell/posistagenet')
const encoder = new Encoder('Server Name', 2,3) //server name, version high, version low

const trackers = []

const tracker = new Tracker(1,'Tracker 1') // id, name
tracker.setPos(1.0,1.0,1.0) // x, y, z

trackers.push(tracker)

const timestamp = 1;


// these two calls return an array of Buffers due to potential splitting that might take place because of max UDP packet size
const dataPackets = encoder.getDataPackets(timestamp, trackers)
const infoPackets = encoder.getInfoPackets(timestamp, trackers)

dataPackets.forEach((dataPacket)=>{
    console.log('send packet somehow')
    console.log(dataPacket)
})

infoPackets.forEach((infoPacket)=>{
    console.log('send packet somehow')
    console.log(infoPacket)
})

```
  
## Notes
- UInt64
  - PosiStageNet uses 64 bit UInt's for timestamp values make sure to use [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) if using values over `Number.MAX_SAFE_INTEGER`
