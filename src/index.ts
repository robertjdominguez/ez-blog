import { createFileNameFromDate } from './utils/fileNaming';
import { args } from './config/Setup';
import { recordAudio } from './recorder/index';
import { transcribe } from './transcriber/transcriber';
import { updateJson } from './transcriber/jsonUpdater';
import { writePost } from './blogger';
import { updateJson as updateBlogJson } from './blogger/jsonUpdater';
import { postBlog } from './poster';

async function main() {
  if (args.post === false) {
    // Create a file name
    const fileName: string = createFileNameFromDate(new Date());
    // Recording
    await recordAudio(args.duration, `.audio/${fileName}.mp3`);
    // Transcription
    const transcription = await transcribe(`.audio/${fileName}.mp3`);
    // Update JSON
    const updated = await updateJson(transcription);
    return updated;
  }

  if (args.post === true) {
    // Create a blog post using the past week's transcriptions
    const newPost = await writePost();
    // Add it to the posts.json file
    await updateBlogJson(newPost);
    // Post it to the blog
    const posted = await postBlog(newPost);
    return posted;
  }
}

main();
