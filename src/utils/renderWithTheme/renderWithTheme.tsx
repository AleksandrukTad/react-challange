import React, { ReactElement } from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../theme/muiTheme";
import { render, RenderResult, RenderOptions } from "@testing-library/react";

export function renderWithTheme(
  component: ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult {
  const result = render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
    options
  );

  return {
    ...result,
    rerender: (rerenderComponent, ...args) =>
      result.rerender(
        <ThemeProvider theme={theme}>{rerenderComponent}</ThemeProvider>,
        ...args
      )
  };
}
