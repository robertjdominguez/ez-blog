import { spawn } from 'child_process';

// function to strip audio from video and create a temporary file
export async function stripAudio(videoPath: string, outPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const childProcess = spawn('ffmpeg', ['-i', videoPath, '-vn', '-acodec', 'libmp3lame', outPath]);

    let output = '';

    childProcess.stdout.on('data', (data: any) => {
      output += data.toString();
    });

    childProcess.on('close', (code: any) => {
      if (code !== 0) {
        reject(`ffmpeg process exited with code ${code}`);
      } else {
        resolve(outPath);
      }
    });
  });
}
