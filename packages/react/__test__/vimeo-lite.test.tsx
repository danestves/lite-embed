// Dependencies
import "@testing-library/jest-dom";

// Internals
import { render } from "../other/test.utils";
import { VimeoLite } from "../src";
import type { VimeoLiteProps } from "../src/types";

let props: VimeoLiteProps = {
  urlOrId: "https://vimeo.com/148751763",
};

describe("VimeoLite", async () => {
  it("should render without crash", () => {
    render(<VimeoLite {...props} />);
  });

  describe("Iframe", () => {
    it("should render after button click", () => {
      let { getByTestId } = render(<VimeoLite {...props} />);

      let button = getByTestId("vimeo-lite-button") as HTMLButtonElement;
      button.click();

      let iframe = getByTestId("vimeo-lite-iframe") as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
    });

    it("should render with a custom title", () => {
      let title = "Rick Astley - Never Gonna Give You Up";
      let { getByTestId } = render(<VimeoLite title={title} {...props} />);

      let button = getByTestId("vimeo-lite-button") as HTMLButtonElement;
      button.click();

      let iframe = getByTestId("vimeo-lite-iframe") as HTMLIFrameElement;
      expect(iframe).toHaveAttribute("title", title);
    });
  });
});
