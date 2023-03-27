export type HttpClientResponse<T> = {
  success: boolean;
  data: T;
};

export type HttpClientFile = {
  success: boolean;
  content: ArrayBuffer;
};
