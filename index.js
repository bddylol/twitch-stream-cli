// broadcast file to twich.tv

require('dotenv/config')
var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');

const streamKey = process.env.key;

var file = process.argv[2];

var ffmpeg = spawn('ffmpeg', [
  '-re',
  '-i', file,
  '-c:v', 'libx264',
  '-preset', 'ultrafast',
  '-tune', 'zerolatency',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-f', 'flv',
  'rtmp://jfk.contribute.live-video.net/app/' + streamKey
]);

ffmpeg.stderr.on('data', function(data) {
  console.log(data.toString());
});

ffmpeg.on('close', function(code) {
  console.log('ffmpeg exited with code ' + code);
});

ffmpeg.on('error', function(err) {
  console.log('ffmpeg error: ' + err);
});