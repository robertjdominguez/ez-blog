const dotenv = require('dotenv');

// load the environment variables from the .env file
dotenv.config();

// Create the variables which we can export and use elsewhere
export const VIDEO_DEVICE_NAME = process.env.VIDEO_DEVICE_NAME!;
export const AUDIO_DEVICE_NAME = process.env.AUDIO_DEVICE_NAME!;
