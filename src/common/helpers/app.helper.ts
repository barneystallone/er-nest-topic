import { existsSync } from 'fs';
import { join } from 'path';

export class AppHelper {
  static isDev(): boolean {
    return process.env.NODE_ENV.startsWith('dev');
  }

  static isProd(): boolean {
    return process.env.NODE_ENV.startsWith('prod');
  }

  static getRootDir(): string {
    let currDir = __dirname;

    while (!existsSync(join(currDir, 'resources'))) {
      currDir = join(currDir, '..');
    }

    return currDir;
  }
}
