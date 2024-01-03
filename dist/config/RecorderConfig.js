"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUDIO_DEVICE_NAME = exports.VIDEO_DEVICE_NAME = void 0;
const dotenv = require('dotenv');
// load the environment variables from the .env file
dotenv.config();
// Create the variables which we can export and use elsewhere
exports.VIDEO_DEVICE_NAME = process.env.VIDEO_DEVICE_NAME;
exports.AUDIO_DEVICE_NAME = process.env.AUDIO_DEVICE_NAME;
