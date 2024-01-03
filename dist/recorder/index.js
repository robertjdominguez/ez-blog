"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordVideo = void 0;
const child_process_1 = require("child_process");
const utils_1 = require("./utils");
const RecorderConfig_1 = require("../config/RecorderConfig");
function recordVideo(duration, outPath) {
    return new Promise((resolve, reject) => {
        const childProcess = (0, child_process_1.spawn)('ffmpeg', [
            '-probesize',
            '50M',
            '-analyzeduration',
            '50M',
            '-t',
            duration.toString(),
            '-f',
            'avfoundation',
            '-video_size',
            '3840x2160',
            '-framerate',
            '23.980010',
            '-i',
            `${RecorderConfig_1.VIDEO_DEVICE_NAME}:${RecorderConfig_1.AUDIO_DEVICE_NAME}`,
            '-c:v',
            'prores',
            '-profile:v',
            '1',
            '-c:a',
            'aac',
            '-y',
            outPath,
        ]);
        childProcess.on('close', (code) => {
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
                resolve(video);
            }
        });
        childProcess.on('error', (error) => {
            reject(error);
        });
    });
}
exports.recordVideo = recordVideo;
