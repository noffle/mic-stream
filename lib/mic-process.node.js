var spawn = require('child_process').spawn
var os = require('os')

module.exports = function micProcess () {
  if (process.platform === 'linux') {
    return spawn('arecord', [
      '-c', '2', // 2 channels
      '-r', '44100', // 44100Hz sample rate
      '-f', 'S16_LE', // little endian 16 bit
      '--buffer-size=16384'
    ])
  } else if (process.platform === 'darwin') {
    return spawn('rec', [ // see http://sox.sourceforge.net
      '-q', // don't show stats
      '-t', 'raw', // record as PCM
      '-c', '2', // 2 channels
      '-r', '44100', // 44100Hz sample rate
      '-b', '16', // little endian 16 bit
      '-' // write audio to stdout
    ])
  } else {
    throw new Error('mic-stream does not support ' + process.platform + '.')
  }
}