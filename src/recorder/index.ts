import { spawn } from 'child_process';
import { getDateString, createCommand, command, osArgs } from './utils';
import { args } from '../config/Setup';

type Recording = {
  duration: number;
  date: Date;
  title: string;
  filePath: string;
};

export function recordAudio(duration: number, outPath: string): Promise<Recording> {
  return new Promise((resolve, reject) => {
    let remainingTime = duration;
    const timer = setInterval(() => {
      process.stdout.write(`Recording... ${remainingTime}s remaining \r`);
      remainingTime--;
    }, 1000);

    // call createCommand() to get the command and args for the current OS
    const [command, ...osArgs] = createCommand(outPath, duration, args);

    // This will actually run the command using our args
    const childProcess = spawn(command, osArgs);

    childProcess.on('close', (code: any) => {
      clearInterval(timer);
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      if (code !== 0) {
        reject(`ffmpeg process exited with code ${code}`);
      } else {
        const video: Recording = {
          duration,
          date: new Date(),
          title: getDateString(new Date()),
          filePath: outPath,
        };
        console.log(`✅ Recording complete`);
        resolve(video);
      }
    });

    childProcess.on('error', (error: any) => {
      clearInterval(timer);
      reject(error);
    });
  });
}
