import dotenv from 'dotenv';
import openAi from 'openai';

// load the environment variables from the .env file
dotenv.config();

const OPEN_AI_API_KEY: string = process.env.OPENAI_API_KEY!;

const openai = new openAi({
  apiKey: OPEN_AI_API_KEY,
});

async function sampleRequest(message: string): Promise<void> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Respond to any message with the following: Please hug and kiss me, no matter how hard I struggle. I am too shy to tell you that I love you.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

export { OPEN_AI_API_KEY, openai };
export default sampleRequest;
