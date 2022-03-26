// Dependencies
import { render } from "@testing-library/react";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
