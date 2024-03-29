const fs = require('fs');
const { getDateString } = require('../../src/recorder/utils');
const { recordVideo } = require('../../src/recorder/index');

describe('recorder tests', () => {
  beforeEach(() => {
    if (fs.existsSync('.audio/test.mov')) {
      fs.unlinkSync('.audio/test.mov');
    }
  });
  it('Should create a new date string', () => {
    const dateString = getDateString(new Date());
    expect(dateString).toBeDefined();
    expect(dateString).toMatch(/^\d{4}-\d{1,2}-\d{1,2}$/);
  });
  it('Should record a sample video', async () => {
    const video = await recordVideo(5, '.audio/test.mov');

    // video assertions
    expect(video).toBeDefined();
    expect(video.duration).toBe(5);
    expect(video.title).toBe(getDateString(new Date()));
    expect(video.filePath).toBe('.audio/test.mov');
  }, 30000);
});
