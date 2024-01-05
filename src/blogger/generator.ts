const openAi = require('openai');
import { OPENAI_API_KEY } from '../config/OpenAIConfig';

const openai = new openAi({
  apiKey: OPENAI_API_KEY,
});

export type BlogPost = {
  title: string;
  createdAt: string;
  body: string;
};

const prompt: string = `You are an expert blogger and ghost writer for me, Rob Dominguez — a software engineer and educator. I have a cynical sense of humor, am self-deprecating, but generally like people and sharing learnings. I have a blog series called WILT: What I Learned Today. I'm providing you with a week's worth of thoughts that have been transcribed from my reflections each day. You should analyze them, break my learnings apart into themes that have their own headings, and provide examples where appropriate — especially if code is involved, give the reader something concrete to illustrate my knowledge with a code snippet. You may need to expand on what I say; that's fine. This should focus on concepts rather than details. This should be a week's summary, not a day-by-day accounting. It shouldn't feel too cheesy. The H1 should always be WILT followed by the date. It should always be written in first person. Here's my braindump: `;

// This function takes in a raw text of all the week's transcripts and generates a new blog post using OpenAI
export async function aiGenerator(rawText: string): Promise<BlogPost> {
  process.stdout.write(`⌨️ Writing blog post \r`);
  const date = new Date();
  let newPost: BlogPost = {
    title: `WILT: Week of ${new Date().toLocaleDateString()}`,
    createdAt: date.toDateString(),
    body: '',
  };
  let conversation = [
    {
      role: 'system',
      content: prompt,
    },
    {
      role: 'user',
      content: rawText,
    },
  ];

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: conversation,
    });

    newPost.body = chatCompletion.choices[0].message.content;
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.log(`✅ Blog post written`);
  } catch (err) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.log(`❌ Blog post not written: ${err}`);
    newPost.body = `An error occurred: ${err}`;
  }

  return newPost;
}
