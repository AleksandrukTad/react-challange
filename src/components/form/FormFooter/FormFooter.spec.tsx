import React from "react";
import { renderWithTheme } from "utils/renderWithTheme";
import { FormFooter } from "components/form";
import { fireEvent } from "@testing-library/dom";

describe("<FormFooter />", () => {
  it("should render the form actions", () => {
    const { getByText, queryByText } = renderWithTheme(<FormFooter />);
    expect(queryByText("Anuluj")).not.toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("should cancel the form", () => {
    const onCancel = jest.fn();
    const { getByText } = renderWithTheme(<FormFooter onCancel={onCancel} />);

    fireEvent.click(getByText("Anuluj"));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should render left content", () => {
    const { getByText } = renderWithTheme(
      <FormFooter leftContent="Left Content Test" />
    );
    expect(getByText("Left Content Test")).toBeInTheDocument();
  });
});
