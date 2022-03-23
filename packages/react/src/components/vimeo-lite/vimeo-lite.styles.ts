// Dependencies
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

// Internals
import { styled } from "@/stitches.config";
import { PlayIcon } from "@/components/icons/play-icon";

const StyledAspectRatio = styled(AspectRatio.Root, {
  backgroundColor: "#000",
  backgroundPosition: "center",
  backgroundSize: "cover",
  contain: "content",
  cursor: "pointer",
  "& iframe": {
    border: 0,
    height: "100%",
    width: "100%",
  },
});

const StyledButton = styled("button", {
  appearance: "none",
  backgroundColor: "rgba(30, 30, 30, 0.9)",
  border: 0,
  borderRadius: 5,
  boxSizing: "border-box",
  color: "#fff",
  height: 40,
  left: "50%",
  lineHeight: "normal",
  margin: 0,
  padding: 0,
  position: "absolute",
  top: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  transition: "opacity 250ms ease-out, background-color 40ms, color 40ms",
  verticalAlign: "baseline",
  width: 65,
  [`${StyledAspectRatio}:hover &`]: {
    backgroundColor: "#00adef",
  },
});

const StyledVimeoIcon = styled(PlayIcon, {
  boxSizing: "border-box",
  height: 20,
  width: 20,
});

const StyledIframe = styled("iframe", {});

export { StyledAspectRatio, StyledIframe, StyledButton, StyledVimeoIcon };
