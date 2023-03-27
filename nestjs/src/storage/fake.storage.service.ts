import { Injectable } from '@nestjs/common';
import AbstractStorage from './storage.abstract';

@Injectable()
export default class FakeStorageService extends AbstractStorage {
  public readonly files: Record<string, Buffer> = {};

  async delete(path: string): Promise<void> {
    delete this.files[path];
  }
  async get(path: string): Promise<Buffer> {
    return this.files[path];
  }
  async write(path: string, content: Buffer): Promise<void> {
    this.files[path] = content;
  }
}
