// Dependencies
import "@testing-library/jest-dom";

// Internals
import VimeoLite from "./vimeo-lite";
import { render } from "other/test.utils";
import type { VimeoLiteProps } from "../../types";

let props: VimeoLiteProps = {
  urlOrId: "https://vimeo.com/148751763",
};

describe("VimeoLite", async () => {
  it("should render without crash", () => {
    render(<VimeoLite {...props} />);
  });

  it("should render an iframe after click", () => {
    let { getByTestId } = render(<VimeoLite {...props} />);

    let button = getByTestId("vimeo-lite-button") as HTMLButtonElement;
    button.click();

    let iframe = getByTestId("vimeo-lite-iframe") as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
  });

  it("should render an iframe with a custom title", () => {
    let title = "Rick Astley - Never Gonna Give You Up";
    let { getByTestId } = render(<VimeoLite title={title} {...props} />);

    let button = getByTestId("vimeo-lite-button") as HTMLButtonElement;
    button.click();

    let iframe = getByTestId("vimeo-lite-iframe") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("title", title);
  });
});
