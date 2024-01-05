"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJson = void 0;
const fs = require('fs');
const path = require('path');
async function updateJson(post) {
    const filePath = path.join(__dirname, '../../posts.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContents);
    data.posts.push(post);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Post logged`);
}
exports.updateJson = updateJson;
