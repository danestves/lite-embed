// Dependencies
import { render, waitFor } from "@testing-library/vue";

// Internals
import { YoutubeLite } from "../src";

let testIds = {
  button: "le-yt-button",
  iframe: "le-yt-iframe",
};

let props = {
  urlOrId: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
};

describe("YoutubeLite", () => {
  it("should render without crash", () => {
    expect(YoutubeLite).toBeTruthy();
  });

  describe("Iframe", () => {
    it("should render after button click", async () => {
      let { getByTestId } = render(YoutubeLite, { props });

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe).toBeTruthy();
      });
    });

    it("should render with a custom title", async () => {
      let title = "Rick Astley - Never Gonna Give You Up";
      let { getByTestId } = render(YoutubeLite, {
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

    it("should render with www.youtube-nocookie.com as src", async () => {
      let { getByTestId } = render(YoutubeLite, { props });

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe.src).toMatch(/youtube-nocookie.com/);
      });
    });

    it("should render with www.youtube.com as src", async () => {
      let { getByTestId } = render(YoutubeLite, {
        props: {
          noCookie: false,
          ...props,
        },
      });

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      await waitFor(() => {
        let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
        expect(iframe.src).toMatch(/youtube.com/);
      });
    });
  });
});
