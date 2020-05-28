import { FieldError } from "react-hook-form";
import { TextFieldErrorProps } from "utils/constants";

export function generatePasswordErrors(
  password?: FieldError
): TextFieldErrorProps {
  if (!password) return {};

  if (password.type === "required") {
    return {
      error: true,
      helperText: "Password is required"
    };
  }

  if (password.type === "lessThenFive") {
    return {
      error: true,
      helperText: "Password needs to be longer then 4 characters"
    };
  }

  return {};
}

export function generateEmailErrors(
  password?: FieldError
): TextFieldErrorProps {
  if (!password) return {};

  if (password.type === "required") {
    return {
      error: true,
      helperText: "Email is required"
    };
  }

  if (password.type === "invalid") {
    return {
      error: true,
      helperText: "Email must be in correct format"
    };
  }

  return {};
}
