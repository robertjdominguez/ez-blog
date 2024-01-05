"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileNaming_1 = require("./utils/fileNaming");
const Setup_1 = require("./config/Setup");
const index_1 = require("./recorder/index");
const transcriber_1 = require("./transcriber/transcriber");
const jsonUpdater_1 = require("./transcriber/jsonUpdater");
const blogger_1 = require("./blogger");
const jsonUpdater_2 = require("./blogger/jsonUpdater");
async function main() {
    if (Setup_1.args.post === false) {
        // Create a file name
        const fileName = (0, fileNaming_1.createFileNameFromDate)(new Date());
        // Recording
        const audio = await (0, index_1.recordAudio)(Setup_1.args.duration, `.videos/${fileName}.mp3`);
        // Transcription
        const transcription = await (0, transcriber_1.transcribe)(`.videos/${fileName}.mp3`);
        // Update JSON
        const updated = await (0, jsonUpdater_1.updateJson)(transcription);
        return updated;
    }
    else {
        // Create a blog post
        const newPost = await (0, blogger_1.writePost)();
        // Add it to the posts.json file
        const updated = await (0, jsonUpdater_2.updateJson)(newPost);
        // Post it to the blog
        // const posted = await postBlog(newPost);
        return updated;
    }
}
main();
