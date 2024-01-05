import os from 'os';

export let command = 'ffmpeg';
export let osArgs: any = [];

export function createCommand(outPath: string, duration: number, args: any): string[] {
  switch (os.platform()) {
    case 'win32':
      // modify command and args for Windows
      osArgs = [
        '-t',
        duration.toString(),
        '-f',
        'dshow',
        '-i',
        `audio=${args.deviceName}`,
        '-acodec',
        'libmp3lame',
        '-y',
        outPath,
      ];
      break;
    case 'linux':
      // modify command and args for Linux
      osArgs = [
        '-t',
        duration.toString(),
        '-f',
        'alsa',
        '-i',
        `default:CARD=${args.deviceName}`,
        '-acodec',
        'libmp3lame',
        '-y',
        outPath,
      ];
      break;
    case 'darwin':
      // modify command and args for macOS
      osArgs = [
        '-t',
        duration.toString(),
        '-f',
        'avfoundation',
        '-i',
        `:${args.deviceName}`,
        '-acodec',
        'libmp3lame',
        '-y',
        outPath,
      ];
      break;
  }
  return [command, ...osArgs];
}

// helper function to create a simple string date like "2020-01-01"
export function getDateString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
