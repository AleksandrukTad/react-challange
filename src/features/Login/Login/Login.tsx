import React, { ReactElement } from "react";
import { LoginForm } from "../LoginForm";
import { useRouter } from "next/router";

export function Login(): ReactElement {
  const { push } = useRouter();

  const handleSuccess = (): void => {
    push("/success", "/success");
  };

  return <LoginForm onSuccess={handleSuccess} />;
}
