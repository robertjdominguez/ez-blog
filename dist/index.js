"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./recorder/index");
async function main() {
    console.log(`Recording...`);
    const video = await (0, index_1.recordVideo)(10, '.videos/test.mov');
    console.log(`🛑 Recording stopped`);
    console.log(video.title);
}
main();
