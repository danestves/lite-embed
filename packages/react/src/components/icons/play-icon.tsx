// Dependencies
import * as React from "react";

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="xMidYMid"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="currentColor" d="m1 0 19 10L1 20z" />
    </svg>
  );
}

export { PlayIcon };
