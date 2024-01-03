import { recordVideo } from './recorder/index';

async function main() {
  console.log(`Recording...`);
  const video = await recordVideo(10, '.videos/test.mov');
  console.log(`🛑 Recording stopped`);
  console.log(video.title);
}

main();
