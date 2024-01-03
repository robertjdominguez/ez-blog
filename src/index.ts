import sampleRequest from './config.ts';

async function main() {
  const sample = await sampleRequest('Hello!');
  console.log(sample);
}

main();
