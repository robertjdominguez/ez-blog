"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileNaming_1 = require("./utils/fileNaming");
const Setup_1 = require("./config/Setup");
const index_1 = require("./recorder/index");
const transcriber_1 = require("./transcriber/transcriber");
const jsonUpdater_1 = require("./transcriber/jsonUpdater");
const blogger_1 = require("./blogger");
const jsonUpdater_2 = require("./blogger/jsonUpdater");
const poster_1 = require("./poster");
async function main() {
    if (Setup_1.args.post === false) {
        // Create a file name
        const fileName = (0, fileNaming_1.createFileNameFromDate)(new Date());
        // Recording
        await (0, index_1.recordAudio)(Setup_1.args.duration, `.audio/${fileName}.mp3`);
        // Transcription
        const transcription = await (0, transcriber_1.transcribe)(`.audio/${fileName}.mp3`);
        // Update JSON
        const updated = await (0, jsonUpdater_1.updateJson)(transcription);
        return updated;
    }
    if (Setup_1.args.post === true) {
        // Create a blog post using the past week's transcriptions
        const newPost = await (0, blogger_1.writePost)();
        // Add it to the posts.json file
        await (0, jsonUpdater_2.updateJson)(newPost);
        // Post it to the blog
        const posted = await (0, poster_1.postBlog)(newPost);
        return posted;
    }
}
main();
