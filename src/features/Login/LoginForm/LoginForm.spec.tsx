import { renderWithTheme } from "utils/renderWithTheme";
import React from "react";
import { LoginForm } from "./LoginForm";
import { FetchMock } from "jest-fetch-mock";
import { fireEvent, wait } from "@testing-library/dom";
import { API_URL } from "utils/constants";

const mockFetch = fetch as FetchMock;

describe("<LoginForm />", () => {
  beforeEach(() => {
    mockFetch.resetMocks();
  });

  it("should fail to submit form due to wrong email and to short password", async () => {
    const mockOnSuccess = jest.fn();
    const { getByTestId, getByText } = renderWithTheme(
      <LoginForm onSuccess={mockOnSuccess} />
    );

    fireEvent.change(getByTestId("email.input"), {
      target: {
        value: "t.com"
      }
    });

    fireEvent.change(getByTestId("password.input"), {
      target: {
        value: "tcom"
      }
    });

    fireEvent.submit(getByTestId("login.form"));

    await wait(() => {
      expect(getByText("Email must be in correct format")).toBeInTheDocument();
      expect(
        getByText("Password needs to be longer then 4 characters")
      ).toBeInTheDocument();
    });
  });

  it("should fail to submit form due to missing email and password", async () => {
    const mockOnSuccess = jest.fn();
    const { getByTestId, getByText } = renderWithTheme(
      <LoginForm onSuccess={mockOnSuccess} />
    );

    fireEvent.submit(getByTestId("login.form"));

    await wait(() => {
      expect(getByText("Email is required")).toBeInTheDocument();
      expect(getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should fail to submit form due to server error", async () => {
    const mockOnSuccess = jest.fn();
    const { getByTestId, getByText } = renderWithTheme(
      <LoginForm onSuccess={mockOnSuccess} />
    );

    fireEvent.change(getByTestId("email.input"), {
      target: {
        value: "t@gmail.com"
      }
    });

    fireEvent.change(getByTestId("password.input"), {
      target: {
        value: "123456"
      }
    });

    mockFetch.mockResponseOnce("", {
      status: 500
    } as any);
    fireEvent.submit(getByTestId("login.form"));

    await wait(() => {
      expect(getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  it("should fail to submit form due to server error", async () => {
    const mockOnSuccess = jest.fn();
    const { getByTestId } = renderWithTheme(
      <LoginForm onSuccess={mockOnSuccess} />
    );

    fireEvent.change(getByTestId("email.input"), {
      target: {
        value: "t@gmail.com"
      }
    });

    fireEvent.change(getByTestId("password.input"), {
      target: {
        value: "123456"
      }
    });

    mockFetch.mockResponseOnce("");
    fireEvent.submit(getByTestId("login.form"));

    await wait(() => {
      expect(mockFetch.mock.calls[0][0]).toEqual(`${API_URL}/login`);
      expect(mockFetch.mock.calls[0][1].body).toStrictEqual(
        JSON.stringify({
          email: "t@gmail.com",
          password: "123456"
        })
      );
    });
  });

  it("should turn on visibility on password", async () => {
    const mockOnSuccess = jest.fn();
    const { getByTestId } = renderWithTheme(
      <LoginForm onSuccess={mockOnSuccess} />
    );

    const input = getByTestId("password.input") as HTMLInputElement;

    expect(input.type).toEqual("password");

    fireEvent.click(getByTestId("visibility.button"));

    expect(input.type).toEqual("text");

    fireEvent.click(getByTestId("visibility.button"));

    expect(input.type).toEqual("password");
  });
});
