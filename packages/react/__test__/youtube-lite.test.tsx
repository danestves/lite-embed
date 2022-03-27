/// <reference types="vite/client" />

// Dependencies
import "@testing-library/jest-dom";

// Internals
import { render } from "../other/test.utils";
import { YoutubeLite } from "../src";
import type { YouTubeLiteProps } from "../src/types";

let props: YouTubeLiteProps = {
  urlOrId: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
};

describe("YoutubeLite", async () => {
  it("should render without crash", () => {
    render(<YoutubeLite {...props} />);
  });

  it("should render iframe after click", () => {
    let { getByTestId } = render(<YoutubeLite {...props} />);

    let button = getByTestId("youtube-lite-button") as HTMLButtonElement;
    button.click();

    let iframe = getByTestId("youtube-lite-iframe") as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
  });

  it("should render iframe with a custom title", () => {
    let title = "Rick Astley - Never Gonna Give You Up";
    let { getByTestId } = render(<YoutubeLite title={title} {...props} />);

    let button = getByTestId("youtube-lite-button") as HTMLButtonElement;
    button.click();

    let iframe = getByTestId("youtube-lite-iframe") as HTMLIFrameElement;
    expect(iframe).toHaveAttribute("title", title);
  });

  it("should render an iframe with the www.youtube-nocookie.com host", () => {
    let { getByTestId } = render(<YoutubeLite {...props} />);

    let button = getByTestId("youtube-lite-button") as HTMLButtonElement;
    button.click();

    let iframe = getByTestId("youtube-lite-iframe") as HTMLIFrameElement;
    expect(iframe.src).toMatch(/youtube-nocookie.com/);
  });

  it("should render an iframe with the www.youtube.com host", () => {
    let { getByTestId } = render(<YoutubeLite noCookie={false} {...props} />);

    let button = getByTestId("youtube-lite-button") as HTMLButtonElement;
    button.click();

    let iframe = getByTestId("youtube-lite-iframe") as HTMLIFrameElement;
    expect(iframe.src).toMatch(/youtube.com/);
  });
});
