import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults: IconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const MapPinIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.75h17M8.5 3v4M15.5 3v4" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3 1.9" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const PhoneIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M6.2 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 6.4 6.4l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m3.8 7 7.1 5.3a2 2 0 0 0 2.2 0L20.2 7" />
  </svg>
);

export const WhatsAppIcon = (props: IconProps) => (
  <svg {...defaults} strokeWidth={1.3} {...props}>
    <path d="M3.6 20.4 5 16.5a7.9 7.9 0 1 1 3 3l-4.4.9Z" />
    <path d="M9.2 9c.2 1 .7 2 1.4 2.8.8.8 1.7 1.3 2.7 1.6l1-1.2 2 .9-.2 1.4c-1.7.5-3.6-.2-5.2-1.7-1.5-1.6-2.2-3.4-1.7-5.1l1.4-.2.9 2-.3.5Z" />
  </svg>
);

export const ShareIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 15.5V3.8M8 7.5l4-3.7 4 3.7" />
    <path d="M5 13v5.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V13" />
  </svg>
);

export const MusicIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M9 18V6.2l10-2v11.6" />
    <circle cx="6.6" cy="18" r="2.4" />
    <circle cx="16.6" cy="15.8" r="2.4" />
  </svg>
);

export const MusicOffIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M9 18V6.2l10-2v4.6" />
    <circle cx="6.6" cy="18" r="2.4" />
    <path d="M4 4l16 16" />
  </svg>
);

export const CopyIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2.2" />
    <path d="M15 6.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h.5" />
  </svg>
);

export const GiftIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <rect x="3.5" y="9" width="17" height="11.5" rx="2" />
    <path d="M3.5 13.5h17M12 9v11.5" />
    <path d="M12 9S9.5 9 8.2 7.8A2.1 2.1 0 0 1 11 4.6C12 5.3 12 9 12 9Zm0 0s2.5 0 3.8-1.2A2.1 2.1 0 0 0 13 4.6C12 5.3 12 9 12 9Z" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const SparkIcon = (props: IconProps) => (
  <svg {...defaults} {...props}>
    <path d="M12 3.5c.9 4.4 4.1 7.6 8.5 8.5-4.4.9-7.6 4.1-8.5 8.5-.9-4.4-4.1-7.6-8.5-8.5 4.4-.9 7.6-4.1 8.5-8.5Z" />
  </svg>
);
