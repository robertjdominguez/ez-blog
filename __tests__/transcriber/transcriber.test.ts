const fs = require('fs');
import { stripAudio } from '../../src/transcriber/stripper';

describe('transcriber tests', () => {
  beforeEach(() => {
    if (fs.existsSync('.videos/test.mp3')) {
      fs.unlinkSync('.videos/test.mp3');
    }
  });
  it('Should split audio from the video', async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const videoPath = '.videos/test.mov';
    const testStrip = await stripAudio(videoPath, '.videos/test.mp3');
    const fileExists = fs.existsSync(testStrip);
    expect(fileExists).toBe(true);
  }, 20000);
});
