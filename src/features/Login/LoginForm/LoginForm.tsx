import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { CardBase } from "components/card";
import { FormControl, FormFooter } from "components/form";
import { TextField, InputAdornment, IconButton, Grid } from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from "@material-ui/icons";
import { validateEmail } from "utils/validation/email";
import { LoginModel } from "models/login";
import { generateEmailErrors, generatePasswordErrors } from "./errors";
import { login } from "apis/login";

export enum PasswordFieldEnum {
  Password = "password",
  Text = "text"
}

export interface IFormContact {
  name: string;
  surname: string;
  email: string;
  phoneNo: string;
  text: string;
}

export interface ILoginFormProps {
  onSuccess(model: LoginModel): void;
}

export function LoginForm({ onSuccess }: ILoginFormProps): ReactElement {
  const [passwordFieldType, setPasswordFieldType] = useState<PasswordFieldEnum>(
    PasswordFieldEnum.Password
  );
  const { errors, handleSubmit, register, formState } = useForm<LoginModel>();

  const request = async (model: LoginModel): Promise<LoginModel> => {
    await login(model);

    return model;
  };

  const handleVisibilityToggle = (): void => {
    if (PasswordFieldEnum.Text === passwordFieldType) {
      setPasswordFieldType(PasswordFieldEnum.Password);
    } else if (PasswordFieldEnum.Password === passwordFieldType) {
      setPasswordFieldType(PasswordFieldEnum.Text);
    }
  };

  const emailErrors = generateEmailErrors(errors.email);
  const passwordErrors = generatePasswordErrors(errors.password);

  return (
    <CardBase title="Log In">
      <FormControl
        request={request}
        onSubmit={handleSubmit}
        footer={<FormFooter formState={formState} />}
        onSuccess={onSuccess}
        data-testid="login.form"
      >
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              fullWidth
              name="email"
              label="Email"
              size="small"
              variant="outlined"
              color="primary"
              inputProps={{
                "data-testid": "email.input"
              }}
              inputRef={register({
                required: true,
                validate: {
                  invalid: (value: string) => {
                    if (validateEmail(value)) return true;
                    return false;
                  }
                }
              })}
              {...emailErrors}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              name="password"
              label="Password"
              inputProps={{
                "data-testid": "password.input"
              }}
              size="small"
              variant="outlined"
              color="primary"
              type={passwordFieldType}
              inputRef={register({
                required: true,
                validate: {
                  lessThenFive: (value: string) => {
                    if (value.trim().length >= 5) return true;
                    return false;
                  }
                }
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleVisibilityToggle}
                      size="small"
                      data-testid="visibility.button"
                    >
                      {passwordFieldType === PasswordFieldEnum.Password ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...passwordErrors}
            />
          </Grid>
        </Grid>
      </FormControl>
    </CardBase>
  );
}
