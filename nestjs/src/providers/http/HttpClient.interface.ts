export type HttpClientResponse<T> = {
  success: boolean;
  data: T;
};

export type HttpClientFile = {
  success: boolean;
  content: ArrayBuffer;
};

export default abstract class IHttpClient {
  abstract get<T>(path: string): Promise<HttpClientResponse<T>>;
  abstract file(path: string): Promise<HttpClientFile>;
}
