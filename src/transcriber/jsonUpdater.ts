const fs = require('fs');
const path = require('path');
import { Transcript } from './transcriber';

export async function updateJson(transcript: Transcript): Promise<void> {
  const filePath = path.join(__dirname, '../../transcripts.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContents);

  data.transcripts.push(transcript);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  // check if file was updated
  const updatedFileContents = fs.readFileSync(filePath, 'utf-8');
  if (updatedFileContents.includes(transcript.text)) {
    console.log(`✅ Transcript logged`);
  } else {
    console.log(`❌ Error logging transcript`);
  }
}
