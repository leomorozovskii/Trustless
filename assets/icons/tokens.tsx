import React, { SyntheticEvent } from 'react';

export interface IconProps {
  onClick?: (evt?: SyntheticEvent) => void;
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  onMouseOver?: any;
  onMouseOut?: any;
  disabled?: boolean;
  role?: string;
}

export const ARMORIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect width="20" height="20" fill="url(#pattern0_62_5890)" />
      <defs>
        <pattern
          id="pattern0_62_5890"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_62_5890" transform="scale(0.015625)" />
        </pattern>
        <image
          id="image0_62_5890"
          width="64"
          height="64"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export const CVXIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.954" cy="10" r="10" fill="white" />
      <path
        d="M16.7954 8.65252V5.9596H15.4469V4.60808H12.751V3.26061H10.055V4.60808H7.36008V5.9596H6.0116V14.0404H7.35907V15.3889H10.055V16.7364H12.75V15.3919H15.4469V14.0404H16.7954V11.3475H14.0995V12.696H12.751V14.0404H10.055V12.696H8.70756V7.30404H10.055V5.9596H12.751V7.30404H14.0995V8.65252H16.7954Z"
        fill="#3A3A3A"
      />
      <rect
        x="13.2004"
        y="7.30505"
        width="0.89899"
        height="1.34747"
        fill="#1682FE"
      />
      <rect
        x="11.8519"
        y="5.95657"
        width="0.89899"
        height="1.34747"
        fill="#1682FE"
      />
      <rect
        x="9.15698"
        y="3.26061"
        width="0.89899"
        height="1.34747"
        fill="#1682FE"
      />
      <rect
        x="12.752"
        y="11.3485"
        width="1.34646"
        height="1.34848"
        fill="#FF5A5A"
      />
      <rect
        x="11.853"
        y="12.696"
        width="0.89899"
        height="1.34747"
        fill="#FF5A5A"
      />
      <rect
        x="9.15601"
        y="15.3919"
        width="0.89899"
        height="1.34747"
        fill="#FF5A5A"
      />
      <rect
        x="6.46008"
        y="14.0434"
        width="0.89899"
        height="1.34747"
        fill="#F4BB3B"
      />
      <rect
        x="5.11255"
        y="10"
        width="0.89899"
        height="4.04343"
        fill="#F4BB3B"
      />
      <rect
        x="5.11255"
        y="5.95657"
        width="0.89899"
        height="4.04343"
        fill="#60D8A4"
      />
      <rect
        x="6.46106"
        y="4.60909"
        width="0.89899"
        height="1.34747"
        fill="#1682FE"
      />
    </svg>
  );
};

export const AlcxIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="10" fill="#252736" stroke="#F6C09A" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.3822 8.39987V13.4244L10.8821 18.6586V13.6387L4.3822 8.39987Z"
        stroke="#F6C09A"
        stroke-linejoin="round"
      />
      <path
        d="M10.8821 20.7202V18.6586L14.0279 16.2375"
        stroke="#F6C09A"
        stroke-linejoin="round"
      />
      <path
        d="M5.51115 14.4551L4.51489 16.2375H7.89276"
        stroke="#F6C09A"
        stroke-linejoin="round"
      />
      <path
        d="M11.0938 16.2375H17.4364L10.9484 5.28919L7.56799 10.7946"
        stroke="#F6C09A"
        stroke-linejoin="round"
      />
      <path d="M14.47 11.0658L17.4363 8.56647" stroke="#F6C09A" />
      <path
        d="M16.4437 14.3553L17.5476 13.4407V8.51045L10.9649 3.30084L4.3822 8.39987"
        stroke="#F6C09A"
        stroke-linejoin="round"
      />
      <path
        d="M10.9649 3.30084V1.25697"
        stroke="#F6C09A"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const BatIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#FF5000" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0319 4.0625L3.75 14.6875L16.25 14.6731L10.0319 4.0625ZM7.44937 12.6038L10.0169 8.3625L12.5962 12.6038H7.44937Z"
        fill="white"
      />
    </svg>
  );
};

export const BusdIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9414 0C16.4578 0 20.9288 4.47191 20.9288 9.98742C20.9288 15.5038 16.4578 19.9748 10.9414 19.9748C5.42589 19.9748 0.953979 15.5034 0.953979 9.98742C0.953979 4.47191 5.42589 0 10.9414 0Z"
        fill="url(#paint0_linear_62_5877)"
      />
      <path
        d="M11.048 3.39394L12.6958 5.10349L8.54649 9.30698L6.89868 7.63765L11.048 3.39394Z"
        fill="black"
      />
      <path
        d="M13.496 5.94466L15.1306 7.61064L8.53324 14.1765L6.89868 12.5498L13.496 5.94466Z"
        fill="black"
      />
      <path
        d="M6.02906 8.37945L7.71022 10.0806L6.02906 11.7418L4.3479 10.0806L6.02906 8.37945Z"
        fill="black"
      />
      <path
        d="M16.0467 8.49539L17.6812 10.1614L11.0839 16.7273L9.44934 15.1005L16.0467 8.49539Z"
        fill="black"
      />
      <defs>
        <linearGradient
          id="paint0_linear_62_5877"
          x1="0.953979"
          y1="0"
          x2="0.953979"
          y2="19.9748"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFEEB8" />
          <stop offset="1" stop-color="#FECB27" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const CbETHIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#0052FF" />
      <circle cx="10" cy="10" r="8.75" fill="white" />
      <path
        d="M10.3113 2.5V8.04375L14.9969 10.1375L10.3113 2.5Z"
        fill="#6697FF"
      />
      <path
        d="M10.3113 2.5L5.625 10.1375L10.3113 8.04375V2.5Z"
        fill="#0052FF"
      />
      <path d="M10.3113 13.73V17.4969L15 11.01L10.3113 13.73Z" fill="#6697FF" />
      <path
        d="M10.3113 17.4969V13.7294L5.625 11.01L10.3113 17.4969Z"
        fill="#0052FF"
      />
      <path
        d="M10.3113 12.8581L14.9969 10.1375L10.3113 8.045V12.8581Z"
        fill="#CCDCFF"
      />
      <path
        d="M5.625 10.1375L10.3113 12.8581V8.045L5.625 10.1375Z"
        fill="#6697FF"
      />
    </svg>
  );
};

export const DaiIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9414 0C16.4578 0 20.9288 4.47191 20.9288 9.98742C20.9288 15.5038 16.4578 19.9748 10.9414 19.9748C5.42589 19.9748 0.953979 15.5034 0.953979 9.98742C0.953979 4.47191 5.42589 0 10.9414 0Z"
        fill="url(#paint0_linear_62_5892)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.18496 15.493V15.5303L6.18316 15.5317V15.538H10.5153C11.0056 15.5447 11.4942 15.5056 11.976 15.4193C12.4834 15.32 12.9778 15.1636 13.4492 14.9515C13.6537 14.8568 13.8498 14.7424 14.0476 14.6269C14.0977 14.5977 14.148 14.5684 14.1984 14.5393C14.4313 14.3735 14.6542 14.1937 14.8663 14.0027C15.447 13.4778 15.8964 12.8229 16.1773 12.0926C16.1962 12.0108 16.2762 11.9582 16.3584 11.9739H17.5382C17.6322 11.9739 17.6632 11.9425 17.6632 11.8364V11.0809C17.6695 11.0085 17.6695 10.9353 17.6632 10.8629C17.6632 10.844 17.668 10.8252 17.6729 10.8063C17.6826 10.7688 17.6922 10.7314 17.6632 10.6939H16.6775C16.5584 10.6939 16.5584 10.6813 16.5584 10.5753C16.5926 10.1951 16.5926 9.81348 16.5584 9.43326C16.5522 9.3209 16.5773 9.3209 16.6645 9.3209H17.5261C17.6263 9.3209 17.6636 9.29573 17.6636 9.19595V8.17213C17.6605 8.10431 17.6589 8.06994 17.6409 8.05252C17.6225 8.03461 17.5866 8.03461 17.514 8.03461H16.3966C16.3095 8.04944 16.2259 7.99056 16.2101 7.90337C16.082 7.56854 15.9189 7.24809 15.7225 6.94831C15.5247 6.65258 15.3018 6.37483 15.0546 6.1182C14.7261 5.79011 14.3571 5.50517 13.9562 5.26921C13.3517 4.9182 12.6906 4.67236 12.0025 4.54517C11.6686 4.4836 11.331 4.44629 10.9913 4.43281H6.3099C6.18496 4.43281 6.18496 4.45798 6.18496 4.55775V7.92225C6.18496 8.0409 6.15979 8.0409 6.06631 8.0409H4.72429C4.62451 8.0409 4.62451 8.05933 4.62451 8.12809V9.22652C4.62451 9.32629 4.65552 9.32629 4.73058 9.32629H6.08519C6.18496 9.32629 6.18496 9.34472 6.18496 9.41978V10.5933C6.18496 10.6993 6.1535 10.6993 6.0726 10.6993H4.62451V11.8854C4.62451 11.9852 4.65552 11.9852 4.73058 11.9852H6.08519C6.18496 11.9852 6.18496 11.9973 6.18496 12.0787V13.5456V14.0387V15.493ZM14.8056 7.93393C14.8164 7.9618 14.8164 7.99281 14.8056 8.02112H14.8357C14.8232 8.05843 14.7607 8.07101 14.7607 8.07101H7.55755C7.43889 8.07101 7.43889 8.04584 7.43889 7.95236V5.73663C7.43889 5.65528 7.45148 5.61798 7.54496 5.61798H10.8969C11.2537 5.61483 11.6097 5.65213 11.958 5.73034C12.6483 5.89393 13.2906 6.21933 13.8308 6.6791C13.9387 6.75955 14.0348 6.85438 14.118 6.96C14.2942 7.13483 14.4488 7.32944 14.58 7.54067C14.6672 7.66427 14.7423 7.79595 14.8056 7.93393ZM15.1045 10.6926H11.3095H7.58901C7.5131 10.6926 7.4757 10.6926 7.45726 10.6739C7.43934 10.6557 7.43934 10.6199 7.43934 10.5492V9.4382C7.43934 9.35056 7.46451 9.31955 7.55799 9.31955H15.1108C15.1922 9.31955 15.2295 9.35056 15.2295 9.42562C15.2605 9.81213 15.2605 10.2004 15.2295 10.5865C15.2236 10.6926 15.1854 10.6926 15.1045 10.6926ZM14.8056 11.991C14.6996 11.9793 14.5926 11.9793 14.4865 11.991H7.56429C7.4708 11.991 7.43934 11.991 7.43934 12.116V14.2822C7.43934 14.382 7.43934 14.4072 7.56429 14.4072H10.7602C10.9131 14.4189 11.0659 14.4081 11.2155 14.3762C11.6793 14.3429 12.1355 14.2422 12.5706 14.0764C12.7288 14.0216 12.8816 13.9501 13.0259 13.8643H13.0695C13.8187 13.4746 14.4272 12.8625 14.811 12.111C14.811 12.111 14.8546 12.0166 14.8056 11.9919V11.991Z"
        fill="#FEFEFD"
      />
      <defs>
        <linearGradient
          id="paint0_linear_62_5892"
          x1="0.953979"
          y1="0"
          x2="0.953979"
          y2="19.9748"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EFD68B" />
          <stop offset="1" stop-color="#F5AC37" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Dao_tokenIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="black" />
      <circle cx="10" cy="10" r="7" fill="white" />
      <circle cx="10" cy="10" r="5" fill="black" />
    </svg>
  );
};

export const EthIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_62_5873)" />
      <path
        d="M10.3113 2.5V8.04375L14.9969 10.1375L10.3113 2.5Z"
        fill="white"
        fill-opacity="0.602"
      />
      <path d="M10.3113 2.5L5.625 10.1375L10.3113 8.04375V2.5Z" fill="white" />
      <path
        d="M10.3113 13.73V17.4969L15 11.01L10.3113 13.73Z"
        fill="white"
        fill-opacity="0.602"
      />
      <path
        d="M10.3113 17.4969V13.7294L5.625 11.01L10.3113 17.4969Z"
        fill="white"
      />
      <path
        d="M10.3113 12.8581L14.9969 10.1375L10.3113 8.045V12.8581Z"
        fill="white"
        fill-opacity="0.2"
      />
      <path
        d="M5.625 10.1375L10.3113 12.8581V8.045L5.625 10.1375Z"
        fill="white"
        fill-opacity="0.602"
      />
      <defs>
        <linearGradient
          id="paint0_linear_62_5873"
          x1="0"
          y1="0"
          x2="0"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9BB5F6" />
          <stop offset="1" stop-color="#627EEA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const FeiIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#22996E" />
      <path
        d="M9.99998 14.4444H4.55553C3.77776 14.4444 3.33331 13.6667 3.77776 13L6.88887 8.11111C7.11109 7.77778 7.44442 7.55556 7.88887 7.55556H12.1111C12.5555 7.55556 12.8889 7.77778 13.1111 8.11111L16.2222 13C16.6666 13.6667 16.2222 14.4444 15.4444 14.4444H9.99998Z"
        fill="white"
      />
      <path
        d="M10.5556 3.33333L11.8889 5.33333C12.1112 5.77778 11.8889 6.33333 11.3334 6.33333H8.66671C8.11116 6.33333 7.88894 5.77778 8.11116 5.33333L9.44449 3.33333C9.77782 2.88889 10.3334 2.88889 10.5556 3.33333Z"
        fill="white"
      />
    </svg>
  );
};

export const LinkIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 10C20 8.69125 19.7394 7.3825 19.2388 6.17312C18.7381 4.96375 17.9969 3.85438 17.0713 2.92875C16.1456 2.00312 15.0363 1.26188 13.8269 0.76125C12.6175 0.260625 11.3088 0 10 0C8.69125 0 7.3825 0.260625 6.17312 0.76125C4.96375 1.26188 3.85438 2.00312 2.92875 2.92875C2.00312 3.85438 1.26188 4.96375 0.76125 6.17312C0.260625 7.3825 0 8.69125 0 10C0 11.3088 0.260625 12.6175 0.76125 13.8269C1.26188 15.0363 2.00312 16.1456 2.92875 17.0713C3.85438 17.9969 4.96375 18.7381 6.17312 19.2388C7.3825 19.7394 8.69125 20 10 20C11.3088 20 12.6175 19.7394 13.8269 19.2388C15.0363 18.7381 16.1456 17.9969 17.0713 17.0713C17.9969 16.1456 18.7381 15.0363 19.2388 13.8269C19.7394 12.6175 20 11.3088 20 10Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.76562 4.03688L10 3.33313L11.2344 4.03688L14.5987 5.96063L15.8331 6.66438V13.3244L14.5987 14.0281L11.265 15.9538L10.0306 16.6556L8.79625 15.9538L5.40125 14.0281L4.16687 13.3244V6.66438L5.40125 5.96063L8.76562 4.03688ZM6.63562 8.06938V11.9194L10 13.845L13.3644 11.9194V8.06938L10 6.14375L6.63562 8.06938Z"
        fill="#2A5ADA"
      />
    </svg>
  );
};

export const ManaIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_62_5882)" />
      <path
        d="M7.08496 6.5V14H13.335L7.08496 6.5Z"
        fill="url(#paint1_linear_62_5882)"
      />
      <path d="M0.834961 14H7.08496V6.5L0.834961 14Z" fill="white" />
      <path
        d="M2 16C2.57 16.755 3.245 17.43 4 18H16C16.755 17.43 17.43 16.755 18 16H2Z"
        fill="#FC9965"
      />
      <path
        d="M4 18C5.67 19.255 7.75 20 10 20C12.25 20 14.33 19.255 16 18H4Z"
        fill="#FF2D55"
      />
      <path
        d="M13.415 10.5V16H18L13.415 10.5Z"
        fill="url(#paint2_linear_62_5882)"
      />
      <path
        d="M13.415 14H0.834961C1.14496 14.715 1.53996 15.385 1.99996 16H13.42V14H13.415Z"
        fill="#FFBC5B"
      />
      <path d="M8.83496 16H13.415V10.5L8.83496 16Z" fill="white" />
      <circle cx="13.415" cy="6.5" r="2.5" fill="#FFC95B" />
      <circle cx="7.08496" cy="3.75" r="1.25" fill="#FFC95B" />
      <defs>
        <linearGradient
          id="paint0_linear_62_5882"
          x1="10"
          y1="-4.142"
          x2="-4.142"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF2D55" />
          <stop offset="1" stop-color="#FFBC5B" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_62_5882"
          x1="7.08284"
          y1="6.5"
          x2="7.08284"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#A524B3" />
          <stop offset="1" stop-color="#FF2D55" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_62_5882"
          x1="13.4135"
          y1="10.5"
          x2="13.4135"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#A524B3" />
          <stop offset="1" stop-color="#FF2D55" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const MkrIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#1AAB9B" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.07812 8.29375V13H4.16687V7.5325C4.16687 7.09437 4.6675 6.84437 5.01812 7.1075L9.34625 10.365C9.48 10.4656 9.55874 10.6231 9.55874 10.79V13H8.6475V10.9794L5.07812 8.29375ZM14.9494 8.29375V13H15.8606V7.5325C15.8606 7.09437 15.36 6.84437 15.0094 7.1075L10.6806 10.365C10.5475 10.4656 10.4687 10.6231 10.4687 10.79V13H11.38V10.9794L14.9494 8.29375Z"
        fill="white"
      />
    </svg>
  );
};

export const StETHIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_62_5883)" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0377 2.5641V9.54757L13.7478 8.16419L10.0377 2.5641Z"
        fill="#66C8FF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0378 2.5641L6.40601 8.16909L10.0378 9.54757V2.5641Z"
        fill="#00A3FF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.40601 8.16909L10.0378 5.9814V10.2155L6.40601 8.16909Z"
        fill="#66C8FF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0377 5.9814L13.6702 8.16419L10.0377 10.2155V5.9814Z"
        fill="#CCEDFF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0377 11.6349V17.2377L14.5716 9.13458L10.0377 11.6349Z"
        fill="#CCEDFF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0378 11.6349L5.59082 9.18983L10.0378 17.2377V11.6349Z"
        fill="#66C8FF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.57965 9.13458C5.07675 9.94495 4.78638 10.901 4.78638 11.9249C4.78638 14.8515 7.11114 17.224 10.0378 17.224L5.57965 9.13458Z"
        fill="#00A3FF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.0377 17.224C12.9644 17.224 15.3846 14.8515 15.3846 11.9249C15.3846 10.8928 15.0896 9.92964 14.5792 9.11514L10.0377 17.224Z"
        fill="#66C8FF"
      />
      <defs>
        <linearGradient
          id="paint0_linear_62_5883"
          x1="1.68952"
          y1="3.37904"
          x2="1.68952"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#B7D0FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const UniIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 10C20 8.69125 19.7394 7.3825 19.2388 6.17312C18.7381 4.96375 17.9969 3.85438 17.0713 2.92875C16.1456 2.00312 15.0363 1.26188 13.8269 0.76125C12.6175 0.260625 11.3088 0 10 0C8.69125 0 7.3825 0.260625 6.17312 0.76125C4.96375 1.26188 3.85438 2.00312 2.92875 2.92875C2.00312 3.85438 1.26188 4.96375 0.76125 6.17312C0.260625 7.3825 0 8.69125 0 10C0 11.3088 0.260625 12.6175 0.76125 13.8269C1.26188 15.0363 2.00312 16.1456 2.92875 17.0713C3.85438 17.9969 4.96375 18.7381 6.17312 19.2388C7.3825 19.7394 8.69125 20 10 20C11.3088 20 12.6175 19.7394 13.8269 19.2388C15.0363 18.7381 16.1456 17.9969 17.0713 17.0713C17.9969 16.1456 18.7381 15.0363 19.2388 13.8269C19.7394 12.6175 20 11.3088 20 10Z"
        fill="url(#paint0_radial_62_5887)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.77561 9.22C8.65624 9.2575 8.55186 9.34062 8.47436 9.43875C8.39624 9.5375 8.34499 9.65062 8.32624 9.78062C8.30749 9.91062 8.32061 10.0562 8.39561 10.1431C8.47124 10.23 8.60874 10.2581 8.73874 10.2631C8.86874 10.2675 8.99061 10.25 9.11311 10.22C9.23561 10.1906 9.35874 10.1494 9.45686 10.07C9.55561 9.99125 9.62936 9.87375 9.62936 9.755C9.62936 9.63562 9.55624 9.51437 9.46686 9.42125C9.37686 9.32812 9.26999 9.26375 9.14936 9.22687C9.02936 9.19062 8.89436 9.1825 8.77561 9.22Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.4287 9.48375C15.1493 9.00063 14.8118 8.83563 14.4218 8.76313C14.0324 8.69 13.5899 8.70875 13.0787 8.65375C12.5674 8.59875 11.9868 8.47 11.5099 8.1325C11.0337 7.795 10.6606 7.24938 10.1943 6.65125C9.72807 6.05375 9.1687 5.40438 7.94495 5.21875C8.98995 5.10188 9.75057 5.64 10.5406 6.54063C11.2299 6.43 11.9631 6.415 12.6437 6.59125C13.3243 6.7675 13.9524 7.135 14.4574 7.64063C14.9631 8.14625 15.3456 8.79063 15.4287 9.48375Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.495 8.52937C11.405 9.415 11.7938 9.91312 12.3569 10.2944C12.92 10.675 13.6575 10.9381 14.1956 11.1569C14.7331 11.3762 15.0713 11.5506 15.3713 11.795C15.6713 12.0394 15.9338 12.3544 15.895 12.9206C16.3225 12.23 16.3413 11.4569 16.1344 10.8631C15.9275 10.2694 15.495 9.85562 14.9944 9.6025C14.4938 9.34937 13.9244 9.2575 13.2769 9.15937C12.6294 9.06125 11.9031 8.9575 11.495 8.52937Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.92435 5.56375C8.53748 5.68125 8.74185 5.90875 8.87123 6.13188C8.99998 6.35563 9.0531 6.575 9.09748 6.7825C9.14123 6.99 9.17623 7.18625 9.23123 7.35125C9.28685 7.51688 9.3631 7.65063 9.42998 7.75563C9.49748 7.86125 9.5556 7.9375 9.57935 7.99125C9.6031 8.04563 9.59123 8.0775 9.5606 8.09688C9.52998 8.11625 9.4806 8.12375 9.40435 8.11875C9.3281 8.11438 9.2256 8.09875 9.0431 8.00375C8.86123 7.90938 8.6006 7.73625 8.34373 7.33875C8.08685 6.94188 7.83435 6.32063 7.92435 5.56375Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.1206 11.0706C12.945 11.5794 13.0406 12.0506 13.215 12.4563C13.3894 12.8619 13.6425 13.2019 13.8675 13.52C14.0925 13.8381 14.29 14.1338 14.4544 14.5113C14.6194 14.8888 14.7513 15.3463 14.3856 16.0788C15.2 15.6863 15.4994 15.135 15.6494 14.6744C15.8 14.2138 15.8019 13.845 15.75 13.52C15.6988 13.195 15.5931 12.9138 15.3944 12.6425C15.1956 12.3706 14.9031 12.1081 14.5325 11.8769C14.1619 11.6456 13.7125 11.4463 13.1206 11.0706Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.10815 13.5075C9.30003 13.3675 9.4244 13.3025 9.5569 13.2431C9.68878 13.1831 9.8294 13.1288 10.005 13.0788C10.1807 13.0288 10.3919 12.9838 10.61 12.945C10.8282 12.9069 11.0538 12.875 11.2519 12.8331C11.4494 12.7906 11.6194 12.7388 11.7707 12.6663C11.9219 12.5944 12.0544 12.5019 12.1663 12.3863C12.2782 12.2706 12.3688 12.1325 12.4307 11.9913C12.4925 11.85 12.525 11.7056 12.5357 11.5431C12.5457 11.38 12.5332 11.1988 12.3844 10.7125C12.6307 10.9819 12.7219 11.2019 12.765 11.4263C12.8082 11.6513 12.8025 11.8819 12.755 12.075C12.7075 12.2675 12.6175 12.4238 12.49 12.58C12.3625 12.7369 12.1975 12.8938 11.985 13.0019C11.7725 13.1094 11.5125 13.1681 11.2619 13.2019C11.0119 13.2363 10.7719 13.2463 10.4613 13.2625C10.1507 13.2794 9.7694 13.3025 9.10815 13.5075Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.28432 9.61813C9.32494 9.5425 9.29744 9.43063 9.23119 9.36563C9.16557 9.3 9.06119 9.2825 8.95494 9.29313C8.84869 9.30375 8.74057 9.34313 8.70057 9.41813C8.65994 9.49313 8.68744 9.6025 8.75307 9.66813C8.81807 9.73313 8.92182 9.75375 9.02807 9.74438C9.13432 9.73438 9.24369 9.69438 9.28432 9.61813Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.34184 15.2581C5.73247 15.2 6.05497 15.1019 6.31872 14.9975C6.58247 14.8931 6.78809 14.7831 6.96747 14.6512C7.14622 14.5194 7.29872 14.3656 7.37809 14.1906C7.45809 14.0156 7.46497 13.8187 7.43622 13.6619C7.40747 13.5044 7.34309 13.3869 7.20497 13.2575C7.06684 13.1281 6.85622 12.9869 6.66622 12.8331C6.47559 12.6794 6.30684 12.5144 6.21747 12.3237C6.12809 12.1337 6.11872 11.9194 6.17934 11.6894C6.24122 11.46 6.37309 11.2156 6.47997 10.9819C6.58747 10.7475 6.66997 10.525 6.71372 10.2725C6.75747 10.02 6.76247 9.73812 6.80559 9.55C6.84872 9.36187 6.93059 9.26687 7.04872 9.2075C7.16684 9.14812 7.32122 9.12437 7.49622 9.09125C7.67184 9.05875 7.86684 9.01687 8.03372 8.92375C8.19997 8.83125 8.33747 8.6875 8.41497 8.53437C8.49309 8.38125 8.51247 8.21875 8.51497 8.11937C8.51684 8.02 8.50247 7.98375 8.44809 7.91375C8.39309 7.84375 8.29872 7.74 8.06997 7.49C7.84122 7.23937 7.47809 6.84187 7.00747 6.33437C6.53622 5.82687 5.95684 5.20812 5.48059 4.6975C5.00372 4.18625 4.62934 3.7825 4.41997 3.56562C4.20997 3.34937 4.16497 3.31937 4.15559 3.3275C4.14622 3.33562 4.17184 3.38187 4.35372 3.6225C4.53497 3.86375 4.87247 4.3 5.30997 4.86C5.74747 5.42 6.28559 6.10437 6.71934 6.65375C7.15372 7.20312 7.48372 7.6175 7.67747 7.86125C7.87122 8.105 7.92872 8.17875 7.94309 8.24687C7.95809 8.31437 7.92997 8.3775 7.88309 8.42312C7.83622 8.46875 7.77059 8.49687 7.68997 8.52187C7.60934 8.54687 7.51372 8.56875 7.42372 8.5625C7.33372 8.55625 7.24872 8.52125 7.17434 8.45875C7.10059 8.39562 7.03684 8.30437 6.87122 8.06187C6.70559 7.82 6.43684 7.42625 6.17747 7.05812C5.91684 6.68937 5.66559 6.34625 5.51559 6.14875C5.36622 5.95062 5.31872 5.89937 5.30684 5.905C5.29559 5.91062 5.32122 5.97375 5.43872 6.19437C5.55622 6.41437 5.76684 6.79187 5.98497 7.19375C6.20309 7.59562 6.42809 8.0225 6.54809 8.255C6.66809 8.48687 6.68247 8.52375 6.67059 8.575C6.65934 8.62625 6.62184 8.69187 6.56309 8.76125C6.50434 8.83125 6.42372 8.90562 6.35434 9.02562C6.28434 9.14562 6.22497 9.31125 6.18309 9.52687C6.14059 9.7425 6.11559 10.0081 6.06059 10.2469C6.00559 10.485 5.92059 10.6969 5.78497 10.93C5.64997 11.1637 5.46372 11.4187 5.27122 11.6619C5.07809 11.9044 4.87872 12.1337 4.74184 12.385C4.60559 12.6356 4.53247 12.9081 4.53684 13.1987C4.54059 13.4894 4.62247 13.7987 4.73434 14.0581C4.84622 14.3175 4.98809 14.5269 5.10747 14.7181C5.22684 14.9094 5.32309 15.0831 5.34184 15.2581Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.57062 13.4563C5.58187 13.4313 5.59 13.4056 5.59625 13.3794C5.62312 13.2638 5.60062 13.1388 5.53125 13.04C5.46437 12.9444 5.3525 12.8744 5.23875 12.9069C5.15562 12.9313 5.07125 13.0113 5.07875 13.0819C5.08562 13.1513 5.1825 13.2125 5.1925 13.2881C5.2025 13.3663 5.12062 13.4606 5.13687 13.5256C5.15437 13.5938 5.27812 13.6306 5.3725 13.6163C5.46812 13.6025 5.53312 13.5375 5.57062 13.4563Z"
        fill="#FF007A"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.10938 15.0644C8.18062 14.1288 9.01187 13.9406 9.665 13.94C10.3175 13.9394 10.7919 14.1269 11.0981 14.3975C11.4037 14.6688 11.5413 15.0231 11.6231 15.4144C11.7044 15.8056 11.73 16.235 11.8506 16.5175C11.9719 16.8 12.1881 16.9356 12.4444 16.975C12.7006 17.015 12.9969 16.9575 13.4044 16.7944C13.1056 17.0338 12.9056 17.1294 12.6919 17.1756C12.4787 17.2225 12.2513 17.22 12.0388 17.1331C11.8269 17.045 11.6294 16.8719 11.4675 16.6275C11.3063 16.3838 11.18 16.0688 11.0438 15.7844C10.9075 15.4994 10.7606 15.2444 10.5181 15.0725C10.2756 14.9006 9.9375 14.8119 9.67062 14.8731C9.40375 14.9344 9.20875 15.1456 9.16188 15.3669C9.11438 15.5888 9.21563 15.8206 9.37937 15.9575C9.5425 16.0938 9.76813 16.135 9.93187 16.0981C10.0956 16.0606 10.1975 15.945 10.2506 15.835C10.3037 15.7256 10.3081 15.6219 10.325 15.5563C10.3412 15.4906 10.3706 15.4625 10.3963 15.4613C10.4225 15.4606 10.445 15.4875 10.4619 15.5475C10.4781 15.6075 10.4875 15.7 10.4744 15.7981C10.4619 15.8969 10.4262 16.0006 10.3581 16.0988C10.2906 16.1969 10.1913 16.2888 10.0463 16.3431C9.9025 16.3981 9.71312 16.415 9.535 16.3738C9.35688 16.3319 9.18937 16.2313 9.02813 16.085C8.86625 15.9394 8.71063 15.7488 8.53188 15.59C8.35312 15.4319 8.15188 15.3063 7.90312 15.2238C7.65437 15.1406 7.35875 15.1006 7.10938 15.0644Z"
        fill="#FF007A"
      />
      <defs>
        <radialGradient
          id="paint0_radial_62_5887"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.1544 28.0188) rotate(-131.081) scale(33.5362)"
        >
          <stop stop-color="#FF64A5" />
          <stop offset="1" stop-color="#FFF8FC" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const UnknownIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <mask
        id="mask0_417_8536"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <circle cx="10" cy="10" r="10" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_417_8536)">
        <rect y="-8" width="28" height="28" fill="url(#pattern0_417_8536)" />
      </g>
      <defs>
        <pattern
          id="pattern0_417_8536"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_417_8536" transform="scale(0.03125)" />
        </pattern>
        <image
          id="image0_417_8536"
          width="32"
          height="32"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAJ5JREFUWEftVsEJACEMO/dxKWcQx3AGlxLXuXs3Qoucnh7En1ghpGkal1K6L+WEELRn862UotY4AtjOQGtNaCDGKHrmvRf3WqvaU6s+5yz+OwI4jgFrbkc1gIJBX+k0QADHMTB7FwxrgACWM7B9GRHAcQyg6Kx8gF6PuwL3PxpdlwkJ4HMGMJBgj5YbEQH8jgH0BfQBa+5f5wECmM3AAxpTLqxyXStRAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};

export const UsdcIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.954 20C16.4957 20 20.954 15.5417 20.954 10C20.954 4.4583 16.4957 0 10.954 0C5.41228 0 0.953979 4.4583 0.953979 10C0.953979 15.5417 5.41228 20 10.954 20Z"
        fill="url(#paint0_linear_62_5876)"
      />
      <path
        d="M13.704 11.5833C13.704 10.125 12.829 9.625 11.079 9.4167C9.82903 9.25 9.57903 8.9167 9.57903 8.3333C9.57903 7.7499 9.99573 7.375 10.829 7.375C11.579 7.375 11.9957 7.625 12.204 8.25C12.2457 8.375 12.3707 8.4583 12.4957 8.4583H13.1623C13.329 8.4583 13.454 8.3333 13.454 8.1667V8.125C13.2873 7.2083 12.5373 6.5 11.579 6.4167V5.4167C11.579 5.25 11.454 5.125 11.2457 5.0833H10.6207C10.454 5.0833 10.329 5.2083 10.2873 5.4167V6.375C9.03733 6.5417 8.24573 7.375 8.24573 8.4167C8.24573 9.7917 9.07903 10.3333 10.829 10.5417C11.9957 10.75 12.3707 11 12.3707 11.6667C12.3707 12.3334 11.7873 12.7917 10.9957 12.7917C9.91233 12.7917 9.53733 12.3333 9.41233 11.7083C9.37073 11.5417 9.24573 11.4583 9.12073 11.4583H8.41233C8.24573 11.4583 8.12073 11.5833 8.12073 11.75V11.7917C8.28733 12.8333 8.95403 13.5833 10.329 13.7917V14.7917C10.329 14.9583 10.454 15.0833 10.6623 15.125H11.2873C11.454 15.125 11.579 15 11.6207 14.7917V13.7917C12.8707 13.5833 13.704 12.7083 13.704 11.5833Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.12064 7.9583C3.91224 11.1667 5.57894 14.7917 8.82894 15.9583C8.95394 16.0417 9.07894 16.2083 9.07894 16.3333V16.9167C9.07894 17 9.07894 17.0417 9.03724 17.0833C8.99564 17.25 8.82894 17.3333 8.66224 17.25C6.32894 16.5 4.53724 14.7083 3.78724 12.375C2.53724 8.4167 4.70394 4.2083 8.66224 2.9583C8.70394 2.9167 8.78724 2.9167 8.82894 2.9167C8.99564 2.9583 9.07894 3.0833 9.07894 3.25V3.8333C9.07894 4.0417 8.99564 4.1667 8.82894 4.25C7.12064 4.875 5.74564 6.2083 5.12064 7.9583ZM12.8706 3.125C12.9122 2.9583 13.0789 2.875 13.2456 2.9583C15.5372 3.7083 17.3706 5.5 18.1206 7.875C19.3706 11.8333 17.2039 16.0417 13.2456 17.2917C13.2039 17.3333 13.1206 17.3333 13.0789 17.3333C12.9122 17.2917 12.8289 17.1667 12.8289 17V16.4167C12.8289 16.2083 12.9122 16.0833 13.0789 16C14.7872 15.375 16.1622 14.0417 16.7872 12.2917C17.9956 9.0833 16.3289 5.4583 13.0789 4.2917C12.9539 4.2083 12.8289 4.0417 12.8289 3.875V3.2917C12.8289 3.2083 12.8289 3.1667 12.8706 3.125Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_62_5876"
          x1="0.953979"
          y1="0"
          x2="0.953979"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#67BFF4" />
          <stop offset="1" stop-color="#2775CA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const UsdtIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C15.5222 0 20 4.47778 20 10C20 15.5222 15.5222 20 10 20C4.47778 20 0 15.525 0 10C0 4.475 4.47778 0 10 0Z"
        fill="url(#paint0_linear_62_5872)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4081 7.39614V8.88503C14.1692 9.01281 16.2442 9.56003 16.247 10.2156C16.247 10.8711 14.172 11.4184 11.4108 11.5461V16.31H8.94973V11.5461C6.18584 11.4184 4.10529 10.8711 4.10529 10.2156C4.10529 9.56003 6.18584 9.01281 8.94973 8.88503V7.39614H5.54695V5.12947H14.8108V7.39614H11.4081ZM11.3767 11.145C11.3918 11.1442 11.4031 11.1437 11.4108 11.1434C13.847 11.0323 15.6664 10.6073 15.672 10.0989C15.672 9.59058 13.8525 9.16558 11.4136 9.05725V10.7184C11.3414 10.7267 10.9608 10.7573 10.2025 10.7573C9.56917 10.7573 9.11362 10.7295 8.95251 10.7184V9.06281C6.50806 9.17114 4.68584 9.59614 4.68584 10.1045C4.68584 10.6128 6.51084 11.0378 8.95251 11.1461V11.1434C9.11084 11.1517 9.55529 11.1684 10.1914 11.1684C10.8972 11.1684 11.2566 11.1508 11.3767 11.145Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_62_5872"
          x1="0"
          y1="0"
          x2="0"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#79F8DC" />
          <stop offset="1" stop-color="#26A17B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const WbtcIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="10" fill="white" stroke="#BDBDBD" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.8678 8.87498C14.7423 7.56996 13.6158 7.13246 12.1935 7.00786L12.1935 5.19767L11.0916 5.19778L11.0917 6.96026C10.802 6.9603 10.5059 6.96602 10.2118 6.97189L10.2119 5.19774L9.11068 5.19771L9.11027 7.00738C8.87172 7.01226 8.63745 7.01669 8.40901 7.01684L8.40887 7.01122L6.88915 7.01071L6.88944 8.18751C6.88944 8.18751 7.70311 8.172 7.68959 8.18699C8.13589 8.18712 8.28115 8.44622 8.3234 8.66981L8.3235 10.732C8.3543 10.7322 8.39448 10.7334 8.43997 10.7397L8.40265 10.7397C8.37708 10.7396 8.35057 10.7396 8.32357 10.7398L8.32329 13.6287C8.30371 13.7692 8.22114 13.9932 7.90933 13.9937C7.92342 14.0062 7.10837 13.9935 7.10837 13.9935L6.88944 15.3094L8.32334 15.3093C8.48343 15.3095 8.64197 15.3112 8.79887 15.3129L8.79915 15.3129C8.90367 15.314 9.00746 15.3151 9.11048 15.3158L9.11095 17.1466L10.2116 17.1468L10.2116 15.3353C10.5138 15.3416 10.8063 15.344 11.0918 15.3437L11.0913 17.1468L12.1931 17.1467L12.1935 15.3191C14.0459 15.2129 15.3424 14.7462 15.5034 13.0066C15.6334 11.6059 14.9745 10.9809 13.923 10.7284C14.5618 10.4031 14.9612 9.82992 14.8678 8.87498ZM13.3263 12.7897C13.3268 14.0449 11.355 14.0175 10.4528 14.005L10.4526 14.005C10.3715 14.0039 10.2991 14.0029 10.2375 14.0029L10.2377 11.5772C10.3128 11.5772 10.404 11.5751 10.5073 11.5726C11.4318 11.5508 13.3263 11.5061 13.3263 12.7897ZM10.419 10.469C11.1717 10.4814 12.8135 10.5084 12.8138 9.36733C12.8137 8.20031 11.2349 8.24213 10.4639 8.26256C10.3772 8.26485 10.3007 8.26688 10.2378 8.26689L10.2377 10.4669C10.2895 10.4669 10.3506 10.4679 10.419 10.469Z"
        fill="url(#paint0_linear_62_5889)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_62_5889"
          x1="4.64587"
          y1="6.31091"
          x2="7.63113"
          y2="18.2841"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FCC538" />
          <stop offset="1" stop-color="#F7931A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const WethIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="9.0115" cy="9.30219" rx="9.0115" ry="9.30219" fill="black" />
      <path
        d="M9.01154 17.9403C13.6334 17.9403 17.3797 14.0732 17.3797 9.30219C17.3797 4.53187 13.6334 0.664774 9.01154 0.664774C4.39029 0.664774 0.644043 4.53187 0.644043 9.30219C0.644043 14.0732 4.39029 17.9403 9.01154 17.9403Z"
        fill="#FF0079"
      />
      <ellipse
        cx="10.9428"
        cy="10.6312"
        rx="8.36781"
        ry="8.63774"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.93152 10.6312C1.93152 15.7686 5.96589 19.9338 10.9428 19.9338C15.9196 19.9338 19.954 15.7686 19.954 10.6312C19.954 5.49381 15.9196 1.32929 10.9428 1.32929C5.96589 1.32929 1.93152 5.49381 1.93152 10.6312ZM19.3109 10.6312C19.3109 15.4015 15.564 19.2693 10.9428 19.2693C6.32152 19.2693 2.57527 15.4015 2.57527 10.6312C2.57527 5.8609 6.32152 1.99381 10.9428 1.99381C15.564 1.99381 19.3109 5.8609 19.3109 10.6312Z"
        fill="black"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.79835 12.9067H7.7171L8.68523 8.63832H7.89148L7.4071 10.968C7.37585 11.108 7.34148 11.2919 7.30273 11.5183C7.2646 11.7454 7.2371 11.9345 7.2196 12.0867C7.20085 11.9286 7.17273 11.7403 7.13648 11.5203C7.10023 11.3003 7.0696 11.1364 7.04523 11.0293L6.49085 8.63832H5.72835L5.17398 11.0293C5.14085 11.1577 5.10585 11.3383 5.06835 11.5712C5.03148 11.8035 5.00773 11.9757 4.9971 12.0867C4.95898 11.7712 4.8971 11.3983 4.8121 10.968L4.32585 8.63832H3.5321L4.50273 12.9067H5.41898L5.93148 10.6706C5.95398 10.5712 5.98585 10.4048 6.02773 10.1725C6.0696 9.93961 6.09523 9.77123 6.10585 9.66606C6.11273 9.75123 6.13898 9.91961 6.18523 10.1693C6.23085 10.4196 6.26398 10.5848 6.28273 10.6641L6.79835 12.9067ZM9.16398 12.9067H11.3552V12.1596H9.97085V11.0583H11.259V10.317H9.97085V9.37961H11.3552V8.63832H9.16398V12.9067ZM13.6171 12.9067H12.8102V9.39123H11.7771V8.63832H14.6502V9.39123H13.6171V12.9067ZM17.5496 12.9067H18.354V8.63832H17.5496V10.3112H16.0427V8.63832H15.2359V12.9067H16.0427V11.0648H17.5496V12.9067Z"
        fill="black"
      />
    </svg>
  );
};

export const WstETHIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="10.954" cy="10" r="10" fill="#0A0A0E" />
      <rect
        x="4.11182"
        y="3.1579"
        width="13.6842"
        height="13.6842"
        fill="url(#pattern0_62_5880)"
      />
      <defs>
        <pattern
          id="pattern0_62_5880"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xmlnsXlink="#image0_62_5880" transform="scale(0.00746269)" />
        </pattern>
        <image
          id="image0_62_5880"
          width="134"
          height="134"
          xmlnsXlink="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export const YfiIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#2C68DB" />
      <rect
        x="9.56543"
        y="5.71758"
        width="0.967017"
        height="8.44772"
        fill="white"
      />
      <path
        d="M7.13752 11.9007C6.87767 12.3592 6.75077 12.8811 6.77106 13.4077C6.77125 15.1136 8.07973 16.5342 9.77981 16.6742C11.4799 16.8143 13.0033 15.6271 13.2827 13.9443C13.5621 12.2615 12.5042 10.6457 10.8501 10.2288V11.2071C11.9665 11.6134 12.6017 12.7914 12.3278 13.9474C12.0539 15.1035 10.9576 15.8712 9.77758 15.7333C8.59755 15.5955 7.70774 14.5958 7.70762 13.4077C7.70839 12.9596 7.84549 12.5223 8.10071 12.154L8.27087 13.7047L9.2061 13.584L8.75357 10.6275L5.81213 11.2158L5.97806 12.1963L7.13752 11.9007Z"
        fill="white"
      />
      <path
        d="M13.0966 7.79309C13.2889 7.37603 13.3269 7.06923 13.3269 6.57978C13.3267 4.87393 12.0183 3.45336 10.3182 3.31327C8.6181 3.17318 7.09473 4.3604 6.8153 6.04321C6.53587 7.72601 7.59379 9.34185 9.24791 9.75873V8.78045C8.34795 8.45229 7.73877 7.60888 7.71014 6.65138C7.68151 5.69389 8.2392 4.81558 9.11795 4.43424C9.9967 4.0529 11.0191 4.2455 11.6989 4.92043C12.3787 5.59536 12.5786 6.61638 12.2035 7.49783L11.6834 6.12279L10.8232 6.39161L11.6565 9.29484L14.506 8.24645L14.1594 7.42946L13.0966 7.79309Z"
        fill="white"
      />
    </svg>
  );
};
