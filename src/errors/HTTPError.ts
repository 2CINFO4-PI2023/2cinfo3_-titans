export class HTTPError extends Error {
  http_code: number;
  description: string;
  constructor(http_code: number, description: string, message: string) {
    super(message);
    this.http_code = http_code;
    this.description = description;
  }
}
