import { Injectable } from '@nestjs/common';
import { unlink, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import AbstractStorage from './storage.abstract';

const at = (path = '') => {
  return join(process.cwd(), 'storage', path);
};

@Injectable()
export default class FileSystemService extends AbstractStorage {
  delete(path: string): Promise<void> {
    return unlink(at(path));
  }
  get(path: string): Promise<Buffer> {
    return readFile(at(path));
  }
  async write(path: string, content: Buffer): Promise<void> {
    await mkdir(at(), { recursive: true });
    return writeFile(at(path), content);
  }
}
