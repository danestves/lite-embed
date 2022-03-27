/// <reference types="vite/client" />

// Dependencies
import { warmYoutubeConnections } from "@lite-embed/utils";
import "@testing-library/jest-dom";

// Internals
import { render } from "../other/test.utils";
import { YoutubeLite } from "../src";
import type { YouTubeLiteProps } from "../src/types";

let testIds = {
  button: "le-yt-button",
  iframe: "le-yt-iframe",
};

let props: YouTubeLiteProps = {
  urlOrId: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
};

describe("YoutubeLite", async () => {
  it("should render without crash", () => {
    render(<YoutubeLite {...props} />);
  });

  describe("Prefetch CDN", () => {
    it("should add prefetch privacy links to head", async () => {
      render(<YoutubeLite {...props} />);

      warmYoutubeConnections({
        preconnected: false,
        setPreconnected: () => {},
        adNetwork: false,
      });

      let links = [
        "https://www.youtube-nocookie.com",
        "https://www.google.com",
      ];

      // Check if links are in the head
      links.forEach((link) => {
        expect(
          document.head.querySelector(`link[href="${link}"]`)
        ).toBeTruthy();
      });
    });

    it("should add prefetch links with ads to head", async () => {
      render(<YoutubeLite {...props} />);

      warmYoutubeConnections({
        preconnected: false,
        setPreconnected: () => {},
        adNetwork: true,
      });

      let links = [
        "https://www.youtube-nocookie.com",
        "https://www.google.com",
        "https://googleads.g.doubleclick.net",
        "https://static.doubleclick.net",
      ];

      // Check if links are in the head
      links.forEach((link) => {
        expect(
          document.head.querySelector(`link[href="${link}"]`)
        ).toBeTruthy();
      });
    });
  });

  describe("Iframe", () => {
    it("should render after button click", () => {
      let { getByTestId } = render(<YoutubeLite {...props} />);

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
    });

    it("should render with a custom title", () => {
      let title = "Rick Astley - Never Gonna Give You Up";
      let { getByTestId } = render(<YoutubeLite title={title} {...props} />);

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
      expect(iframe).toHaveAttribute("title", title);
    });

    it("should render with www.youtube-nocookie.com as src", () => {
      let { getByTestId } = render(<YoutubeLite {...props} />);

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
      expect(iframe.src).toMatch(/youtube-nocookie.com/);
    });

    it("should render with www.youtube.com as src", () => {
      let { getByTestId } = render(<YoutubeLite noCookie={false} {...props} />);

      let button = getByTestId(testIds.button) as HTMLButtonElement;
      button.click();

      let iframe = getByTestId(testIds.iframe) as HTMLIFrameElement;
      expect(iframe.src).toMatch(/youtube.com/);
    });
  });
});
