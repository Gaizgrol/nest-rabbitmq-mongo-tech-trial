import { Injectable } from '@nestjs/common';
import AbstractHttpClient from './client.abstract';
import { HttpClientFile, HttpClientResponse } from './client.types';

@Injectable()
export default class FakeHttpClientService extends AbstractHttpClient {
  async get<T = unknown>(url: string): Promise<HttpClientResponse<T>> {
    console.log('GET', url);
    throw new Error('Method not implemented!');
  }

  async file(url: string): Promise<HttpClientFile> {
    return {
      success: true,
      content: new TextEncoder().encode(url),
    };
  }
}
