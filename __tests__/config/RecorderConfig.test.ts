const { VIDEO_DEVICE_NAME } = require('../../src/config/RecorderConfig.ts');

describe('recorder config', () => {
  it('Should find the desired video device', () => {
    expect(VIDEO_DEVICE_NAME).toBeDefined();
  });
});
