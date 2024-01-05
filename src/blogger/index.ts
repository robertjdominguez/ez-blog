const fs = require('fs');
import { Transcript } from '../transcriber/transcriber';
import { aiGenerator, BlogPost } from './generator';

export async function writePost(): Promise<BlogPost> {
  const transcripts = await getTranscripts();

  const newPost: BlogPost = await aiGenerator(transcripts);

  return newPost;
}

// function to get the transcripts as an array from within the past five days from the JSON file
async function getTranscripts(): Promise<string> {
  let rawText: string = '';
  const transcripts = await getJson();
  const filteredTranscripts = await filterTranscripts(transcripts);

  // loop through filtered transcripts and add them to the raw text
  for (const transcript of filteredTranscripts) {
    rawText += transcript.text + '\n';
  }

  return rawText;
}

// function to filter the transcripts to only include those from the past five days
async function filterTranscripts(transcripts: Transcript[]): Promise<Transcript[]> {
  //   filter the transcripts to only include those from the past five days
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
  const filteredTranscripts = transcripts.filter((transcript: Transcript) => {
    const transcriptDate = new Date(transcript.date);
    return transcriptDate > fiveDaysAgo;
  });

  // sort the transcripts by date
  filteredTranscripts.sort((a: Transcript, b: Transcript) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate.getTime() - aDate.getTime();
  });

  return filteredTranscripts;
}

// function to get the JSON file as an array of transcripts
async function getJson(): Promise<Transcript[]> {
  const file = fs.readFileSync('./transcripts.json');
  const json = JSON.parse(file);

  return json.transcripts;
}
