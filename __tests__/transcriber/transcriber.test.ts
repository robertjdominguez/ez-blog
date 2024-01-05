const fs = require('fs');
import { stripAudio } from '../../src/transcriber/stripper';

describe('transcriber tests', () => {
  // beforeEach(() => {
  //   if (fs.existsSync('.audio/test.mp3')) {
  //     fs.unlinkSync('.audio/test.mp3');
  //   }
  // });
  it('Should split audio from the video', async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const videoPath = '.audio/test.mov';
    const testStrip = await stripAudio(videoPath, '.audio/test.mp3');
    const fileExists = fs.existsSync(testStrip);
    expect(fileExists).toBe(true);
  }, 30000);
});
