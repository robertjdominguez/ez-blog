import { spawn } from 'child_process';
import { getDateString } from './utils';
import { VIDEO_DEVICE_NAME, AUDIO_DEVICE_NAME } from '../config/RecorderConfig';

type Video = {
  duration: number;
  date: Date;
  title: string;
  tags?: string[];
  filePath: string;
};

export function recordVideo(duration: number, outPath: string): Promise<Video> {
  return new Promise((resolve, reject) => {
    const childProcess = spawn('ffmpeg', [
      '-probesize',
      '50M',
      '-analyzeduration',
      '50M',
      '-t',
      duration.toString(),
      '-f',
      'avfoundation',
      '-video_size',
      '3840x2160',
      '-framerate',
      '23.980010',
      '-i',
      `${VIDEO_DEVICE_NAME}:${AUDIO_DEVICE_NAME}`,
      '-c:v',
      'prores',
      '-profile:v',
      '1',
      '-c:a',
      'aac',
      '-y',
      outPath,
    ]);

    childProcess.on('close', (code: any) => {
      if (code !== 0) {
        reject(`ffmpeg process exited with code ${code}`);
      } else {
        const video: Video = {
          duration,
          date: new Date(),
          title: getDateString(new Date()),
          filePath: outPath,
        };
        resolve(video);
      }
    });

    childProcess.on('error', (error: any) => {
      reject(error);
    });
  });
}
