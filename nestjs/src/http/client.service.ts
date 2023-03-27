import { Injectable } from '@nestjs/common';
import AbstractHttpClient from './client.abstract';
import { HttpClientFile, HttpClientResponse } from './client.types';

@Injectable()
export default class HttpClientService extends AbstractHttpClient {
  async get<T = unknown>(url: string): Promise<HttpClientResponse<T>> {
    const response = await fetch(url, {
      method: 'GET',
    });
    return {
      success: response.ok,
      data: await response.json(),
    };
  }

  async file(url: string): Promise<HttpClientFile> {
    const response = await fetch(url, {
      method: 'GET',
    });
    return {
      success: response.ok,
      content: await response.arrayBuffer(),
    };
  }
}
