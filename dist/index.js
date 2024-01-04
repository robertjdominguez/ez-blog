"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileNaming_1 = require("./utils/fileNaming");
const index_1 = require("./recorder/index");
const stripper_1 = require("./transcriber/stripper");
const transcriber_1 = require("./transcriber/transcriber");
const jsonUpdater_1 = require("./transcriber/jsonUpdater");
const fileName = (0, fileNaming_1.createFileNameFromDate)(new Date());
const duration = 10;
async function main() {
    // Video
    const video = await (0, index_1.recordVideo)(duration, `.videos/${fileName}.mov`);
    // Audio
    const audio = await (0, stripper_1.stripAudio)(video.filePath, `.videos/${fileName}.mp3`);
    // Transcription
    const transcription = await (0, transcriber_1.transcribe)(`.videos/${fileName}.mp3`);
    // Update JSON
    const updated = await (0, jsonUpdater_1.updateJson)(transcription);
}
main();
