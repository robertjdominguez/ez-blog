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
    const audio = await recordAudio(args.duration, `.videos/${fileName}.mp3`);
    // Transcription
    const transcription = await transcribe(`.videos/${fileName}.mp3`);
    // Update JSON
    const updated = await updateJson(transcription);
    return updated;
  }

  if (args.post === true) {
    // Create a blog post
    const newPost = await writePost();
    // Add it to the posts.json file
    const updated = await updateBlogJson(newPost);
    // Post it to the blog
    // const posted = await postBlog(newPost);
    return updated;
  }
}

main();
