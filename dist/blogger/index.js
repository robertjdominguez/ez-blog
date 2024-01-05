"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePost = void 0;
const fs = require('fs');
const generator_1 = require("./generator");
async function writePost() {
    const transcripts = await getTranscripts();
    const newPost = await (0, generator_1.aiGenerator)(transcripts);
    return newPost;
}
exports.writePost = writePost;
// function to get the transcripts as an array from within the past five days from the JSON file
async function getTranscripts() {
    let rawText = '';
    const transcripts = await getJson();
    const filteredTranscripts = await filterTranscripts(transcripts);
    // loop through filtered transcripts and add them to the raw text
    for (const transcript of filteredTranscripts) {
        rawText += transcript.text + '\n';
    }
    return rawText;
}
// function to filter the transcripts to only include those from the past five days
async function filterTranscripts(transcripts) {
    //   filter the transcripts to only include those from the past five days
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const filteredTranscripts = transcripts.filter((transcript) => {
        const transcriptDate = new Date(transcript.date);
        return transcriptDate > fiveDaysAgo;
    });
    // sort the transcripts by date
    filteredTranscripts.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return bDate.getTime() - aDate.getTime();
    });
    return filteredTranscripts;
}
// function to get the JSON file as an array of transcripts
async function getJson() {
    const file = fs.readFileSync('./transcripts.json');
    const json = JSON.parse(file);
    return json.transcripts;
}
