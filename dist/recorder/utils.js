"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateString = exports.createCommand = exports.osArgs = exports.command = void 0;
const os_1 = __importDefault(require("os"));
exports.command = 'ffmpeg';
exports.osArgs = [];
function createCommand(outPath, duration, args) {
    switch (os_1.default.platform()) {
        case 'win32':
            // modify command and args for Windows
            exports.osArgs = [
                '-t',
                duration.toString(),
                '-f',
                'dshow',
                '-i',
                `audio=${args.deviceName}`,
                '-acodec',
                'libmp3lame',
                '-y',
                outPath,
            ];
            break;
        case 'linux':
            // modify command and args for Linux
            exports.osArgs = [
                '-t',
                duration.toString(),
                '-f',
                'alsa',
                '-i',
                `default:CARD=${args.deviceName}`,
                '-acodec',
                'libmp3lame',
                '-y',
                outPath,
            ];
            break;
        case 'darwin':
            // modify command and args for macOS
            exports.osArgs = [
                '-t',
                duration.toString(),
                '-f',
                'avfoundation',
                '-i',
                `:${args.deviceName}`,
                '-acodec',
                'libmp3lame',
                '-y',
                outPath,
            ];
            break;
    }
    return [exports.command, ...exports.osArgs];
}
exports.createCommand = createCommand;
// helper function to create a simple string date like "2020-01-01"
function getDateString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
exports.getDateString = getDateString;
