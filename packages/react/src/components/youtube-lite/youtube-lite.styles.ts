// Dependencies
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

// Internals
import { styled } from "@/stitches.config";
import { YouTubeIcon } from "@/components/icons/youtube-icon";

const StyledAspectRatio = styled(AspectRatio.Root, {
  backgroundColor: "#000",
  backgroundPosition: "center",
  backgroundSize: "cover",
  contain: "content",
  cursor: "pointer",
  "&::before": {
    content: '""',
    backgroundImage:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==)",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "top",
    boxSizing: "content-box",
    display: "block",
    height: 60,
    paddingBottom: 50,
    position: "absolute",
    top: 0,
    transition: "all 0.2s cubic-bezier(0, 0, 0.2, 1)",
    width: "100%",
  },
  "& iframe": {
    border: 0,
    height: "100%",
    width: "100%",
  },
});

const StyledYouTubeIcon = styled(YouTubeIcon, {
  boxSizing: "border-box",
  color: "#212121",
  height: "auto",
  left: "50%",
  opacity: 0.8,
  position: "absolute",
  top: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  transition: "all 0.2s cubic-bezier(0, 0, 0.2, 1)",
  width: 68,
  zIndex: 1,
  [`${StyledAspectRatio}:hover &`]: {
    color: "#f00",
    opacity: 1,
  },
});

const StyledIframe = styled("iframe", {});

export { StyledAspectRatio, StyledIframe, StyledYouTubeIcon };
