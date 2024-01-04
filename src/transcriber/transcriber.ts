const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const openAi = require('openai');
import { OPENAI_API_KEY } from '../config/OpenAIConfig';

export type Transcript = {
  text: string;
  date: Date;
};

const openai = new openAi({
  apiKey: OPENAI_API_KEY,
});

export async function transcribe(filePath: string): Promise<Transcript> {
  let transcript: Transcript;
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
  } catch (err: any) {
    console.log(`❌ Error transcribing audio`);
    return err.message;
  }
}
