"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcribe = void 0;
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const openAi = require('openai');
const OpenAIConfig_1 = require("../config/OpenAIConfig");
const openai = new openAi({
    apiKey: OpenAIConfig_1.OPENAI_API_KEY,
});
async function transcribe(filePath) {
    let transcript;
    const file = fs.createReadStream(filePath);
    const filename = path.basename(filePath);
    const form = new FormData();
    form.append('model', 'whisper-1');
    form.append('file', file, filename);
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
        });
        transcript = {
            text: transcription.text,
            date: new Date(),
        };
        console.log(`✅ Transcription complete`);
        return transcript;
    }
    catch (err) {
        console.log(`❌ Error transcribing audio`);
        return err.message;
    }
}
exports.transcribe = transcribe;
