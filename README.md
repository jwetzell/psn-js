![npm](https://img.shields.io/npm/v/%40jwetzell%2Fposistagenet)
# psn-js
js implementation of the [PosiStageNet protocol](https://github.com/vyv/psn-cpp/blob/master/doc/PosiStageNetprotocol_v2.03_2019_09_09.pdf)


## Install
`npm install --save @jwetzell/posistagenet`

## Usage

### Decode - [example](./examples/psn_client.js)
```
const { Decoder } = require('@jwetzell/posistagenet')
const decoder = new Decoder()

const infoPacketBuffer = Buffer.from('5667348000000c0001000000000000000203010101000b00536572766572204e616d650200118001000d8000000900547261636b65722031','hex')
const dataPacketBuffer = Buffer.from('5567288000000c00010000000000000002030101010014800100108000000c000000803f0000803f0000803f','hex')

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
    console.log(dataPacket.toString('hex'))
})

infoPackets.forEach((infoPacket)=>{
    console.log('send packet somehow')
    console.log(infoPacket.toString('hex'))
})

```
  
## Notes
- UInt64
  - PosiStageNet uses 64 bit UInt's for timestamp values make sure to use [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) if using values over `Number.MAX_SAFE_INTEGER`