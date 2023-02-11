const fs = require('fs');
const argv = process.argv.slice(2);
const error = msg => {
    console.error(msg)
    process.exit(1)
}
if(!argv[0]) return error ('Invalid params, <stream-key>, <file> <twitch-user>')
if(!argv[1]) return error ('Invalid params, <stream-key>, <file> <twitch-user>')
if(!argv[2]) return error ('Invalid params, <stream-key>, <file> <twitch-user>')
console.log("Writing .env")

fs.writeFileSync(".env", `KEY=${argv[0]}\nFILE=${argv[1]}\nTWITCH_NAME=${argv[2]}`, (err,data) => {
    if(!err) {
        console.log("Written .env")
    } else {
        error(err)
    }
})