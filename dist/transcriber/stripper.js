"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAudio = void 0;
const child_process_1 = require("child_process");
// function to strip audio from video and create a temporary file
async function stripAudio(videoPath, outPath) {
    return new Promise((resolve, reject) => {
        const childProcess = (0, child_process_1.spawn)('ffmpeg', ['-i', videoPath, '-vn', '-acodec', 'libmp3lame', outPath]);
        let output = '';
        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });
        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.log(`❌ Error stripping audio`);
                reject(`ffmpeg process exited with code ${code}`);
            }
            else {
                console.log(`✅ Audio stripped`);
                resolve(outPath);
            }
        });
    });
}
exports.stripAudio = stripAudio;
