// Dependencies
import { vi } from "vitest";

// Internals
import { warmYoutubeConnections } from "../src";

describe("warmYoutubeConnections()", () => {
  it("should have the correct preconnections on <head /> without ad network", () => {
    const preconnected = false;
    const setPreconnected = vi.fn();
    const adNetwork = false;

    warmYoutubeConnections({
      preconnected,
      setPreconnected,
      adNetwork,
    });

    let urls = ["https://www.youtube-nocookie.com", "https://www.google.com"];

    urls.forEach((url) => {
      expect(document.head.querySelector(`link[href="${url}"]`)).toBeTruthy();
    });
  });

  it("should have the correct preconnections on <head /> with ad network", () => {
    const preconnected = false;
    const setPreconnected = vi.fn();
    const adNetwork = true;

    warmYoutubeConnections({
      preconnected,
      setPreconnected,
      adNetwork,
    });

    let urls = [
      "https://www.youtube-nocookie.com",
      "https://www.google.com",
      "https://googleads.g.doubleclick.net",
      "https://static.doubleclick.net",
    ];

    urls.forEach((url) => {
      expect(document.head.querySelector(`link[href="${url}"]`)).toBeTruthy();
    });
  });
});
