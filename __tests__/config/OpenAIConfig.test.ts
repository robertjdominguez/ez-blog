const { sampleRequest, OPENAI_API_KEY } = require('../../src/config/OpenAIConfig');

// test the openAI config object to ensure it can connect to the API
// and that the API key is valid
describe('openAI config', () => {
  it('Should have a valid API key', () => {
    expect(OPENAI_API_KEY).toBeDefined();
  });
  // TODO: uncomment this once we're happy so we don't waste API calls
  // it('should execute the sample request function', async () => {
  //   const responseObject = await sampleRequest('Sup, bro?');
  //   const responseText: string = responseObject.choices[0].message.content;
  //   expect(responseText).toBe(
  //     'Please hug and kiss me, no matter how hard I struggle. I am too shy to tell you that I love you.'
  //   );
  // });
});
