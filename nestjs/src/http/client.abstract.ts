import { HttpClientFile, HttpClientResponse } from './client.types';

export default abstract class AbstractHttpClient {
  abstract get<T>(url: string): Promise<HttpClientResponse<T>>;
  abstract file(url: string): Promise<HttpClientFile>;
}
