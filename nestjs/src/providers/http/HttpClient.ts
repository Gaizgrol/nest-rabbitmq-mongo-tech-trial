import IHttpClient, {
  HttpClientFile,
  HttpClientResponse,
} from './HttpClient.interface';

export default class HttpClient extends IHttpClient {
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
    console.log('ok?', response.ok, 'status', response.status);
    return {
      success: response.ok,
      content: await response.arrayBuffer(),
    };
  }
}
