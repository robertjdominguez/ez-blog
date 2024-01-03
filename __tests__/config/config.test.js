import sampleRequest, { OPEN_AI_API_KEY } from '../../src/config.js';

// test the openAI config object to ensure it can connect to the API
// and that the API key is valid
describe('openAI config', () => {
  it('should have a valid API key', () => {
    console.log(OPEN_AI_API_KEY);
    expect(OPEN_AI_API_KEY).toBeDefined();
  });
  it('should execute the sample request function', async () => {
    const response = await sampleRequest('Sup, bro?');
    expect(response.choices[0].message.text).toBe(
      'Please hug and kiss me, no matter how hard I struggle. I am too shy to tell you that I love you.'
    );
  });
});
