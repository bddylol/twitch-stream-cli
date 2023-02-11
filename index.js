// broadcast file to twitch.tv

require("dotenv/config");
var spawn = require("child_process").spawn;

const streamKey = process.env.KEY;
const twitchUser = process.env.TWITCH_NAME;
var file = process.env.FILE;

var ffmpeg = spawn("ffmpeg", [
  "-re",
  "-i",
  file,
  "-c:v",
  "libx264",
  "-preset",
  "ultrafast",
  "-tune",
  "zerolatency",
  "-c:a",
  "aac",
  "-b:a",
  "128k",
  "-f",
  "flv",
  "rtmp://jfk.contribute.live-video.net/app/" + streamKey,
]);

ffmpeg.stderr.on("data", function (data) {
  console.log(data.toString());
});

ffmpeg.on("close", function (code) {
  console.log("ffmpeg exited with code " + code);
});

ffmpeg.on("error", function (err) {
  console.log("ffmpeg error: " + err);
});

console.log("Streaming on https://www.twitch.tv/" + twitchUser);
