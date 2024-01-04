import { createFileNameFromDate } from './utils/fileNaming';
import { recordVideo } from './recorder/index';
import { stripAudio } from './transcriber/stripper';
import { transcribe } from './transcriber/transcriber';
import { updateJson } from './transcriber/jsonUpdater';

const fileName: string = createFileNameFromDate(new Date());
const duration: number = 10;

async function main() {
  // Video
  const video = await recordVideo(duration, `.videos/${fileName}.mov`);

  // Audio
  const audio = await stripAudio(video.filePath, `.videos/${fileName}.mp3`);

  // Transcription
  const transcription = await transcribe(`.videos/${fileName}.mp3`);

  // Update JSON
  const updated = await updateJson(transcription);
}

main();
