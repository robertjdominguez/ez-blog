"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordAudio = void 0;
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
const Setup_1 = require("../config/Setup");
function recordAudio(duration, outPath) {
    return new Promise((resolve, reject) => {
        let remainingTime = duration;
        const timer = setInterval(() => {
            process.stdout.write(`Recording... ${remainingTime}s remaining \r`);
            remainingTime--;
        }, 1000);
        // call createCommand() to get the command and args for the current OS
        const [command, ...osArgs] = (0, utils_1.createCommand)(outPath, duration, Setup_1.args);
        // This will actually run the command using our args
        const childProcess = (0, child_process_1.spawn)(command, osArgs);
        childProcess.on('close', (code) => {
            clearInterval(timer);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            if (code !== 0) {
                reject(`ffmpeg process exited with code ${code}`);
            }
            else {
                const video = {
                    duration,
                    date: new Date(),
                    title: (0, utils_1.getDateString)(new Date()),
                    filePath: outPath,
                };
                console.log(`✅ Recording complete`);
                resolve(video);
            }
        });
        childProcess.on('error', (error) => {
            clearInterval(timer);
            reject(error);
        });
    });
}
exports.recordAudio = recordAudio;
