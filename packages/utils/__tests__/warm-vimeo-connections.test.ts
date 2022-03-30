// Dependencies
import { vi } from "vitest";

// Internals
import { warmVimeoConnections } from "../src";

describe("warmVimeoConnections()", () => {
  it("should have the correct preconnections on <head /> without ad network", () => {
    const preconnected = false;
    const setPreconnected = vi.fn();
    const adNetwork = false;

    warmVimeoConnections({
      preconnected,
      setPreconnected,
      adNetwork,
    });

    let urls = [
      "https://player.vimeo.com",
      "https://i.vimeocdn.com",
      "https://f.vimeocdn.com",
    ];

    urls.forEach((url) => {
      expect(document.head.querySelector(`link[href="${url}"]`)).toBeTruthy();
    });
  });

  it("should have the correct preconnections on <head /> with ad network", () => {
    const preconnected = false;
    const setPreconnected = vi.fn();
    const adNetwork = true;

    warmVimeoConnections({
      preconnected,
      setPreconnected,
      adNetwork,
    });

    let urls = [
      "https://player.vimeo.com",
      "https://i.vimeocdn.com",
      "https://f.vimeocdn.com",
      "https://fresnel.vimeocdn.com",
    ];

    urls.forEach((url) => {
      expect(document.head.querySelector(`link[href="${url}"]`)).toBeTruthy();
    });
  });
});
