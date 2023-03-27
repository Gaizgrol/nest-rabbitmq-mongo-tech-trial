export default abstract class AbstractStorage {
  abstract delete(path: string): Promise<void>;
  abstract get(path: string): Promise<Buffer>;
  abstract write(path: string, content: ArrayBuffer): Promise<void>;
}
