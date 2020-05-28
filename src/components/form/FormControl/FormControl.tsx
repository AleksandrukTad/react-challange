import React, {
  ReactElement,
  ReactNode,
  useState,
  HTMLAttributes,
  ReactNodeArray,
  BaseSyntheticEvent
} from "react";
import { formatError, FormattedError, ErrorLike } from "utils/formatError";
import { Typography, makeStyles } from "@material-ui/core";

interface IFormControl<Model = unknown>
  extends Omit<HTMLAttributes<HTMLFormElement>, keyof IFormControl> {
  children?: ReactNode | ReactNodeArray;
  footer?: ReactNode | ReactNodeArray;
  request(model: Model): Promise<Model>;
  onSubmit: (
    callback: (
      model: Model,
      event: BaseSyntheticEvent | undefined
    ) => void | Promise<void>
  ) => (event: BaseSyntheticEvent) => Promise<void>;
  onError?(error: FormattedError): void;
  onSuccess?(model: Model): void;
  validate?(formData: Model): boolean;
}

const useStyles = makeStyles(theme => ({
  errorMessage: {
    marginTop: theme.spacing(2)
  }
}));

export function FormControl<Model = unknown>({
  children,
  footer,
  onError,
  onSubmit: handleSubmit,
  onSuccess,
  request,
  validate,
  ...otherProps
}: IFormControl<Model>): ReactElement {
  const classNames = useStyles();
  const [error, setError] = useState<ErrorLike>();

  async function onSubmit(model: Model): Promise<void> {
    const valid = validate ? validate(model) : true;
    if (!valid) return;

    try {
      const data: Model = await request(model);
      onSuccess && onSuccess(data);
    } catch (errorResponse) {
      console.error(errorResponse);
      const error = await formatError(errorResponse);

      setError(error);
      onError && onError(error);
    }
  }

  return (
    <form {...otherProps} onSubmit={handleSubmit(onSubmit)}>
      {children}
      {error && (
        <Typography className={classNames.errorMessage} color="error">
          {error.result.message || "Something went wrong"}
        </Typography>
      )}
      {footer}
    </form>
  );
}
