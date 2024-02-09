import process from 'process';
import * as yaml from 'js-yaml';
import fs from 'fs';
import dotenv from 'dotenv';

const defaultPath = 'config/default.yml';

export class ConfigService {
  private readonly config: Record<string, any>;

  constructor() {
    dotenv.config();
    const path: string = !!process.env.CONFIG_FILE_PATH
      ? process.env.CONFIG_FILE_PATH
      : defaultPath;
    this.config = yaml.load(fs.readFileSync(path, 'utf8')) as Record<
      string,
      any
    >;
  }

  getConfig<T>(key: string): T {
    if (!this.config[key]) {
      throw new Error(`Configuration key '${key} was not found'`);
    }
    return this.config[key] as T;
  }
}
