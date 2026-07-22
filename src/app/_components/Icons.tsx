import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

function Svg(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20.5s-6.5-4.35-8.82-8.18C1.17 8.96 2.2 5.5 5.56 4.6c2.1-.56 4.16.24 5.44 2 1.28-1.76 3.34-2.56 5.44-2 3.36.9 4.39 4.36 2.38 7.72C18.5 16.15 12 20.5 12 20.5Z" />
    </Svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 1.15 3.85L17 8l-3.85 1.15L12 13l-1.15-3.85L7 8l3.85-1.15L12 3Z" />
      <path d="m18.5 14 .57 1.93L21 16.5l-1.93.57L18.5 19l-.57-1.93L16 16.5l1.93-.57L18.5 14Z" />
      <path d="m5.5 13 .57 1.93L8 15.5l-1.93.57L5.5 18l-.57-1.93L3 15.5l1.93-.57L5.5 13Z" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </Svg>
  );
}

export function MusicNoteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 4v10.5a2.5 2.5 0 1 1-1-2V7.2l7-1.7v7a2.5 2.5 0 1 1-1-2V4.25L14 5.5Z" />
    </Svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}

export function BrokenHeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20.5s-6.5-4.35-8.82-8.18C1.17 8.96 2.2 5.5 5.56 4.6c2.1-.56 4.16.24 5.44 2 1.28-1.76 3.34-2.56 5.44-2 3.36.9 4.39 4.36 2.38 7.72C18.5 16.15 12 20.5 12 20.5Z" />
      <path d="m12.7 6.8-2.3 3 2.1 1.15-2 3.15" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12 4.2 4.2L19 6.8" />
    </Svg>
  );
}
