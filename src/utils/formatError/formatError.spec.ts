import casual from "casual";
import { formatError } from ".";

let baseMockResponse: Partial<Response> = {};

describe("formatError", () => {
  beforeEach(() => {
    baseMockResponse = {
      headers: new Headers(),
      ok: false,
      status: casual.integer(400, 599),
      statusText: casual.string,
      url: casual.string
    };
  });

  it("should format error with JSON response", async () => {
    const mockJsonResponse = {
      error: casual.string
    };

    const mockResponse: Partial<Response> = {
      ...baseMockResponse,
      json: async () => mockJsonResponse,
      clone: (): any => mockResponse
    };

    const errorResponse = await formatError(mockResponse as Response);

    expect(errorResponse).toStrictEqual(
      new Error(
        `Response not successful: Received status code ${mockResponse.status}`
      )
    );
    expect(errorResponse.response).toStrictEqual(mockResponse);
    expect(errorResponse.result).toStrictEqual(mockJsonResponse);
    expect(errorResponse.status).toBe(mockResponse.status);
  });

  it("should format error with TEXT response", async () => {
    const mockTextResponse = casual.string;

    const mockResponse: Partial<Response> = {
      ...baseMockResponse,
      text: async () => mockTextResponse,
      clone: (): any => mockResponse
    };

    const errorResponse = await formatError(mockResponse as Response);

    expect(errorResponse).toStrictEqual(
      new Error(
        `Response not successful: Received status code ${mockResponse.status}`
      )
    );
    expect(errorResponse.response).toStrictEqual(mockResponse);
    expect(errorResponse.result).toStrictEqual(mockTextResponse);
    expect(errorResponse.status).toBe(mockResponse.status);
  });

  it("should format use parsed error message if available", async () => {
    const mockJsonResponse = {
      message: "User friendly error message"
    };

    const mockResponse: Partial<Response> = {
      ...baseMockResponse,
      json: async () => mockJsonResponse,
      clone: (): any => mockResponse
    };

    const errorResponse = await formatError(mockResponse as Response);

    expect(errorResponse).toStrictEqual(new Error(mockJsonResponse.message));
  });
});
