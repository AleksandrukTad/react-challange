import { renderWithTheme } from "utils/renderWithTheme";
import React from "react";
import { Login } from "./Login";
import { FetchMock } from "jest-fetch-mock";
import { fireEvent, wait } from "@testing-library/dom";
import { ILoginFormProps } from "../LoginForm";

const mockFetch = fetch as FetchMock;
const mockPush = jest.fn();
const mockOnSucessResponse = jest.fn();

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/",
      asPath: "/",
      push: mockPush
    };
  }
}));

jest.mock("../LoginForm", () => {
  return {
    LoginForm: function LoginForm({
      onSuccess
    }: Pick<ILoginFormProps, "onSuccess">) {
      return (
        <form
          data-testid="login.form"
          onSubmit={async () =>
            onSuccess && onSuccess(await mockOnSucessResponse())
          }
        ></form>
      );
    }
  };
});

describe("<Login />", () => {
  beforeEach(() => {
    mockFetch.resetMocks();
  });

  it("should login and redirect", async () => {
    const { getByTestId } = renderWithTheme(<Login />);

    fireEvent.submit(getByTestId("login.form"));

    await wait(() => {
      expect(mockPush).toBeCalledWith("/success", "/success");
    });
  });
});
