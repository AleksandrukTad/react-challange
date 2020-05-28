export type ErrorResult = { message: string; status: number };

export type ErrorLike = {
  response: Response;
  result: ErrorResult;
  status: number;
} & Error;

export type FormattedError = ErrorLike | null;

export async function formatError(response: Response): Promise<ErrorLike> {
  let message = `Response not successful: Received status code ${response.status}`;

  let parsed: any;

  try {
    parsed = await response.clone().json();

    if (parsed.message) {
      message = parsed.message;
    }
  } catch (error) {
    // its not json
    parsed = await response.clone().text();
  }

  const error = new Error(message) as ErrorLike;

  error.response = response;
  error.result = parsed as ErrorResult;
  error.status = response.status;

  return error;
}
