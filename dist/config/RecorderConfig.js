"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUDIO_DEVICE_NAME = exports.VIDEO_DEVICE_NAME = void 0;
// take the arguments from the command line and make each pair into a key value pair
const args = process.argv.slice(2).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    return {
        ...acc,
        [key]: value,
    };
}, {});
// print the --duration argument
console.log(typeof args);
// Create the variables which we can export and use elsewhere
exports.VIDEO_DEVICE_NAME = process.env.VIDEO_DEVICE_NAME;
exports.AUDIO_DEVICE_NAME = process.env.AUDIO_DEVICE_NAME;
