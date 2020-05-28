const PROCESS_ENV =
  typeof window !== "undefined" ? (window as any).env || {} : process.env;

export const API_URL = PROCESS_ENV.API_URL;

export type TextFieldErrorProps = { error?: boolean; helperText?: string };
