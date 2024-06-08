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
      <mask id="mask0_417_8536" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_417_8536)">
        <rect y="-8" width="28" height="28" fill="url(#pattern0_417_8536)" />
      </g>
      <defs>
        <pattern id="pattern0_417_8536" patternContentUnits="objectBoundingBox" width="1" height="1">
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
    <svg {...props} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.954 20C16.4957 20 20.954 15.5417 20.954 10C20.954 4.4583 16.4957 0 10.954 0C5.41228 0 0.953979 4.4583 0.953979 10C0.953979 15.5417 5.41228 20 10.954 20Z"
        fill="url(#paint0_linear_62_5876)"
      />
      <path
        d="M13.704 11.5833C13.704 10.125 12.829 9.625 11.079 9.4167C9.82903 9.25 9.57903 8.9167 9.57903 8.3333C9.57903 7.7499 9.99573 7.375 10.829 7.375C11.579 7.375 11.9957 7.625 12.204 8.25C12.2457 8.375 12.3707 8.4583 12.4957 8.4583H13.1623C13.329 8.4583 13.454 8.3333 13.454 8.1667V8.125C13.2873 7.2083 12.5373 6.5 11.579 6.4167V5.4167C11.579 5.25 11.454 5.125 11.2457 5.0833H10.6207C10.454 5.0833 10.329 5.2083 10.2873 5.4167V6.375C9.03733 6.5417 8.24573 7.375 8.24573 8.4167C8.24573 9.7917 9.07903 10.3333 10.829 10.5417C11.9957 10.75 12.3707 11 12.3707 11.6667C12.3707 12.3334 11.7873 12.7917 10.9957 12.7917C9.91233 12.7917 9.53733 12.3333 9.41233 11.7083C9.37073 11.5417 9.24573 11.4583 9.12073 11.4583H8.41233C8.24573 11.4583 8.12073 11.5833 8.12073 11.75V11.7917C8.28733 12.8333 8.95403 13.5833 10.329 13.7917V14.7917C10.329 14.9583 10.454 15.0833 10.6623 15.125H11.2873C11.454 15.125 11.579 15 11.6207 14.7917V13.7917C12.8707 13.5833 13.704 12.7083 13.704 11.5833Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
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
          <stop stopColor="#67BFF4" />
          <stop offset="1" stopColor="#2775CA" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const UsdtIcon: React.FC<IconProps> = (props) => {
  return (
    <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 0C15.5222 0 20 4.47778 20 10C20 15.5222 15.5222 20 10 20C4.47778 20 0 15.525 0 10C0 4.475 4.47778 0 10 0Z"
        fill="url(#paint0_linear_62_5872)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4081 7.39614V8.88503C14.1692 9.01281 16.2442 9.56003 16.247 10.2156C16.247 10.8711 14.172 11.4184 11.4108 11.5461V16.31H8.94973V11.5461C6.18584 11.4184 4.10529 10.8711 4.10529 10.2156C4.10529 9.56003 6.18584 9.01281 8.94973 8.88503V7.39614H5.54695V5.12947H14.8108V7.39614H11.4081ZM11.3767 11.145C11.3918 11.1442 11.4031 11.1437 11.4108 11.1434C13.847 11.0323 15.6664 10.6073 15.672 10.0989C15.672 9.59058 13.8525 9.16558 11.4136 9.05725V10.7184C11.3414 10.7267 10.9608 10.7573 10.2025 10.7573C9.56917 10.7573 9.11362 10.7295 8.95251 10.7184V9.06281C6.50806 9.17114 4.68584 9.59614 4.68584 10.1045C4.68584 10.6128 6.51084 11.0378 8.95251 11.1461V11.1434C9.11084 11.1517 9.55529 11.1684 10.1914 11.1684C10.8972 11.1684 11.2566 11.1508 11.3767 11.145Z"
        fill="white"
      />
      <defs>
        <linearGradient id="paint0_linear_62_5872" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#79F8DC" />
          <stop offset="1" stopColor="#26A17B" />
        </linearGradient>
      </defs>
    </svg>
  );
};
