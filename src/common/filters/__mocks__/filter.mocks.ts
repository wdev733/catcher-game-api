import type { ArgumentsHost, Logger } from '@nestjs/common';

export const getMockArgumentsHost = (request: Request, response: Response): ArgumentsHost =>
  ({
    switchToHttp: () => ({
      getResponse: (): Response => response,
      getRequest: (): Request => request,
    }),
  } as unknown as ArgumentsHost);

export const getMockLogger = (): Logger =>
  ({
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
    debug: jest.fn(),
  } as unknown as Logger);

/**
 * `status` and `json` call histories are available on `statusMock` and
 * `jsonMock`.
 * @returns mock of an Express response object.
 */
export const getMockResponse = (): Response => {
  class MockResponse {
    public statusMock;
    public jsonMock;

    constructor() {
      this.statusMock = jest.fn();
      this.jsonMock = jest.fn();
    }

    status(...args: unknown[]): this {
      this.statusMock(...args);
      return this;
    }

    json(...args: unknown[]): this {
      this.jsonMock(...args);
      return this;
    }
  }

  return new MockResponse() as unknown as Response;
};
