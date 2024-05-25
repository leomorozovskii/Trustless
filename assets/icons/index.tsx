import React, { SyntheticEvent } from 'react';

interface IconProps {
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

export const OfferIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.8807 4.56999C10.9853 4.19011 10.0005 3.97998 8.96667 3.97998C4.84294 3.97998 1.5 7.32292 1.5 11.4466C1.5 15.5704 4.84294 18.9133 8.96667 18.9133C10.0467 18.9133 11.0731 18.684 12 18.2714"
        stroke="black"
        stroke-width="1.5"
      />
      <circle cx="15.6" cy="11.4" r="7.65" stroke="black" stroke-width="1.5" />
    </svg>
  );
};

export const HistoryIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.6923 7.84619V13.3847H8.53846"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="12" r="8.25" stroke="black" stroke-width="1.5" />
    </svg>
  );
};
