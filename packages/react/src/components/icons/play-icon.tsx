// Dependencies
import * as React from 'react';

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 20 20"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m1 0 19 10L1 20z" fill="currentColor" />
    </svg>
  );
}

export { PlayIcon };
