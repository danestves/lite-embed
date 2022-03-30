// Dependencies
import { render, waitFor } from "@testing-library/vue";

// Internals
import { VimeoLite } from "../src";

let testIds = {
  button: "le-vi-button",
  iframe: "le-vi-iframe",
};

let props = {
  urlOrId: "https://vimeo.com/148751763",
};

describe("VimeoLite", () => {
  it("should render without crash", () => {
    expect(VimeoLite).toBeTruthy();
  });

  describe("Iframe", () => {
    it("should render after button click", async () => {
      let { getByTestId } = render(VimeoLite, { props });

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toBeTruthy();
      });
    });

    it("should render with a custom title", async () => {
      let title = "Rick Astley - Never Gonna Give You Up";
      let { getByTestId } = render(VimeoLite, {
        props: {
          title,
          ...props,
        },
      });

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toHaveAttribute("title", title);
      });
    });
  });
});
