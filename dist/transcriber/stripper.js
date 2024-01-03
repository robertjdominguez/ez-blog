"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAudio = void 0;
const child_process_1 = require("child_process");
// function to strip audio from video and create a temporary file
async function stripAudio(videoPath) {
    return new Promise((resolve, reject) => {
        const childProcess = (0, child_process_1.spawn)('ffmpeg', [
            '-i',
            videoPath,
            '-c:v',
            'copy',
            '-an',
            '-y',
            '-f',
            'mov',
            '-hide_banner',
            '-loglevel',
            'error',
            '-nostats',
            '-progress',
            '-',
            '-',
        ]);
        let output = '';
        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });
        childProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`ffmpeg process exited with code ${code}`);
            }
            else {
                const regex = /Destination: (.*)/g;
                const match = regex.exec(output);
                if (match) {
                    resolve(match[1]);
                }
                else {
                    reject('No match found');
                }
            }
        });
    });
}
exports.stripAudio = stripAudio;
