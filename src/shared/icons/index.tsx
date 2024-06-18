import type { SyntheticEvent } from 'react';
import React from 'react';

type IconProps = {
  onClick?: (evt?: SyntheticEvent) => void;
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  disabled?: boolean;
  role?: string;
};

const OfferIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.8807 4.56999C10.9853 4.19011 10.0005 3.97998 8.96667 3.97998C4.84294 3.97998 1.5 7.32292 1.5 11.4466C1.5 15.5704 4.84294 18.9133 8.96667 18.9133C10.0467 18.9133 11.0731 18.684 12 18.2714"
        stroke="black"
        strokeWidth="1.5"
      />
      <circle cx="15.6" cy="11.4" r="7.65" stroke="black" strokeWidth="1.5" />
    </svg>
  );
};

const AcceptOfferIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="18"
      viewBox="0 0 20 18"
      className={className}
      fill="none"
      {...props}
    >
      <path d="M1 9H18.25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10.75 1.5L18.25 9L10.75 16.5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SuccessAcceptIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      className={className}
      {...props}
    >
      <circle cx="48" cy="48" r="47" fill="white" stroke="black" strokeWidth="2" />
      <path d="M24.0747 49.2442L41.3649 69.3796L72.0057 27.139" stroke="black" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const InfoIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99998 1.83325C4.31998 1.83325 1.33331 4.81992 1.33331 8.49992C1.33331 12.1799 4.31998 15.1666 7.99998 15.1666C11.68 15.1666 14.6666 12.1799 14.6666 8.49992C14.6666 4.81992 11.68 1.83325 7.99998 1.83325ZM7.33331 11.8333V10.4999H8.66665V11.8333H7.33331ZM7.33331 5.16659V9.16659H8.66665V5.16659H7.33331Z"
        fill="black"
      />
    </svg>
  );
};

const SmallArrow: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="15"
      viewBox="0 0 26 15"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M25.2071 8.20711C25.5976 7.81658 25.5976 7.18342 25.2071 6.79289L18.8431 0.428932C18.4526 0.0384078 17.8195 0.0384078 17.4289 0.428932C17.0384 0.819457 17.0384 1.45262 17.4289 1.84315L23.0858 7.5L17.4289 13.1569C17.0384 13.5474 17.0384 14.1805 17.4289 14.5711C17.8195 14.9616 18.4526 14.9616 18.8431 14.5711L25.2071 8.20711ZM0.5 8.5H24.5V6.5H0.5V8.5Z"
        fill="black"
      />
    </svg>
  );
};

const ClearCross: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M4 4L12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4L4 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const SelectIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M3 5L8.22727 10.2273L13 5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const HistoryIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.6923 7.84619V13.3847H8.53846"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="8.25" stroke="black" strokeWidth="1.5" />
    </svg>
  );
};

const InputCross: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path d="M4 4L12 12" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4L4 12" stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const InputError: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1.33333C4.32 1.33333 1.33333 4.31999 1.33333 8C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.31999 11.68 1.33333 8 1.33333ZM7.33333 11.3333V10H8.66667V11.3333H7.33333ZM7.33333 4.66666V8.66666H8.66667V4.66666H7.33333Z"
        fill="#C10015"
      />
    </svg>
  );
};

const InputSearch: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      className={className}
      fill="none"
      {...props}
    >
      <circle cx="5" cy="5" r="4.25" stroke="black" strokeWidth="1.5" />
      <path d="M12 12L8.34027 8.3403" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CheckboxCheck: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="10"
      viewBox="0 0 13 10"
      className={className}
      fill="none"
      {...props}
    >
      <path d="M1 5.4L4.2 8.6L12.2 1" stroke="white" strokeWidth="1.5" />
    </svg>
  );
};

const ButtonPlus: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      {...props}
    >
      <path d="M12 5.25V18.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.25 12H18.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

const CopyIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 12C5.63333 12 5.31944 11.8694 5.05833 11.6083C4.79722 11.3472 4.66667 11.0333 4.66667 10.6667V2.66666C4.66667 2.29999 4.79722 1.98611 5.05833 1.72499C5.31944 1.46388 5.63333 1.33333 6 1.33333H12C12.3667 1.33333 12.6806 1.46388 12.9417 1.72499C13.2028 1.98611 13.3333 2.29999 13.3333 2.66666V10.6667C13.3333 11.0333 13.2028 11.3472 12.9417 11.6083C12.6806 11.8694 12.3667 12 12 12H6ZM6 10.6667H12V2.66666H6V10.6667ZM3.33333 14.6667C2.96667 14.6667 2.65278 14.5361 2.39167 14.275C2.13056 14.0139 2 13.7 2 13.3333V3.99999H3.33333V13.3333H10.6667V14.6667H3.33333Z"
        fill="black"
      />
    </svg>
  );
};

const DayIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.98455 2.8621C8.34713 2.8621 8.65571 2.55352 8.65571 2.19094V0.671167C8.65571 0.308582 8.34713 0 7.98455 0C7.62196 0 7.31338 0.308582 7.31338 0.671167V2.19094C7.31338 2.55352 7.62196 2.8621 7.98455 2.8621ZM12.5592 4.38188L13.6392 3.30184C13.8938 3.04726 13.8938 2.60753 13.6315 2.35295C13.3769 2.09065 12.9449 2.09065 12.6903 2.35295L11.6103 3.43299C11.348 3.69528 11.348 4.11958 11.6103 4.38188C11.8649 4.63646 12.2969 4.64417 12.5592 4.38188ZM4.3511 4.38186C4.60569 4.13499 4.60569 3.68755 4.35882 3.43297L3.2865 2.35293C3.03191 2.09835 2.59219 2.09063 2.3376 2.35293C2.08302 2.60751 2.08302 3.04724 2.32989 3.2941L3.40221 4.38186C3.65679 4.63644 4.08881 4.63644 4.3511 4.38186ZM7.97677 11.7647C10.0366 11.7647 11.7415 10.0675 11.7415 8.00002C11.7415 5.94023 10.0366 4.23531 7.97677 4.23531C5.9247 4.23531 4.21978 5.94023 4.21978 8.00002C4.21978 10.0675 5.9247 11.7647 7.97677 11.7647ZM7.97686 10.5612C6.58052 10.5612 5.41562 9.40405 5.41562 7.99999C5.41562 6.60366 6.58052 5.43876 7.97686 5.43876C9.38091 5.43876 10.5381 6.60366 10.5381 7.99999C10.5381 9.40405 9.38091 10.5612 7.97686 10.5612ZM15.2902 8.67118C15.6528 8.67118 15.9614 8.3626 15.9614 8.00001C15.9614 7.63743 15.6528 7.32885 15.2902 7.32885H13.7859C13.4156 7.32885 13.107 7.63743 13.107 8.00001C13.107 8.3626 13.4156 8.67118 13.7859 8.67118H15.2902ZM2.18322 8.67118C2.54581 8.67118 2.85439 8.3626 2.85439 8.00001C2.85439 7.63743 2.54581 7.32885 2.18322 7.32885H0.671167C0.308582 7.32885 0 7.63743 0 8.00001C0 8.3626 0.308582 8.67118 0.671167 8.67118H2.18322ZM13.6392 13.6548C13.8938 13.3925 13.8938 12.9682 13.6392 12.7059L12.5515 11.6336C12.2969 11.3713 11.8649 11.3713 11.6103 11.6336C11.348 11.8881 11.348 12.3202 11.6103 12.5747L12.6903 13.6625C12.9526 13.9171 13.3769 13.9094 13.6392 13.6548ZM3.27093 13.6548L4.35097 12.5824C4.60555 12.3202 4.60555 11.8881 4.35868 11.6336C4.1041 11.379 3.66437 11.379 3.40208 11.6336L2.32975 12.6982C2.06746 12.9527 2.06746 13.3925 2.32204 13.6471C2.57662 13.9016 3.01635 13.9094 3.27093 13.6548ZM7.98455 16C8.34713 16 8.65571 15.6914 8.65571 15.3289V13.8168C8.65571 13.4465 8.34713 13.1379 7.98455 13.1379C7.62196 13.1379 7.31338 13.4465 7.31338 13.8168V15.3289C7.31338 15.6914 7.62196 16 7.98455 16Z"
        fill="black"
      />
    </svg>
  );
};

const NightIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.75 15.4766C10.9688 15.4766 13.5859 13.7812 14.7891 11.0156C14.8828 10.8047 14.9062 10.6328 14.9062 10.5391C14.9062 10.2109 14.6328 9.99219 14.3828 9.99219C14.25 9.99219 14.1406 10.0078 13.9531 10.0859C13.3672 10.3281 12.4766 10.4844 11.6016 10.4844C7.57812 10.4844 5.08594 8.07031 5.08594 4.17188C5.08594 3.07031 5.27344 2.09375 5.53906 1.5625C5.65625 1.33594 5.6875 1.21875 5.6875 1.0625C5.6875 0.796875 5.44531 0.5 5.10938 0.5C5.03906 0.5 4.89062 0.515625 4.67188 0.601562C1.92969 1.71875 0 4.60156 0 7.71875C0 12.2031 3.26562 15.4766 7.75 15.4766ZM7.8046 14.2259C4.01554 14.2259 1.25773 11.4603 1.25773 7.66338C1.25773 6.19749 1.75903 4.76569 2.63095 3.62259C3.07236 3.04391 3.90617 3.57619 3.90617 4.30401C3.90617 8.89776 6.71085 11.6399 11.4062 11.6399C12.0465 11.6399 12.5258 12.39 12.0264 12.7907C10.8879 13.7041 9.39128 14.2259 7.8046 14.2259Z"
        fill="white"
      />
    </svg>
  );
};

const NewWindowIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect opacity="0.01" width="16" height="16" fill="black" />
      <path
        d="M8.38434 8L12.3342 3.97745V5.20625V6.62187L13.4731 6.60313V2.45C13.4731 2.18281 13.2996 2 13.0231 2L8.86526 2.00938L8.85119 3.19404H10.1778H11.4328L7.49872 7.11914L8.38434 8Z"
        fill="black"
      />
      <path
        d="M5.61632 2.60001H3C2.44772 2.60001 2 3.04772 2 3.60001V12.454C2 13.0063 2.44772 13.454 3 13.454H11.9974C12.5497 13.454 12.9974 13.0063 12.9974 12.454V9.76002V9.76002"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ShareIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect opacity="0.01" width="16" height="16" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.68852 10.2862C8.57746 10.3949 8.44632 10.4493 8.29508 10.4493C8.13912 10.4493 8.00561 10.3949 7.89455 10.2862C7.78349 10.1775 7.72796 10.0476 7.72796 9.89632V2.61586L7.77049 1.5525L7.29553 2.05583L6.21799 3.20425C6.11874 3.31768 5.98878 3.37439 5.82809 3.37439C5.68158 3.37439 5.55989 3.32713 5.463 3.23261C5.36612 3.13809 5.31768 3.01758 5.31768 2.87107C5.31768 2.79545 5.33186 2.72811 5.36021 2.66903C5.38857 2.60995 5.4311 2.55442 5.48782 2.50244L7.88392 0.191405C7.95481 0.120514 8.02215 0.0708906 8.08595 0.0425343C8.14976 0.0141781 8.21947 0 8.29508 0C8.36597 0 8.43332 0.0141781 8.49712 0.0425343C8.56092 0.0708906 8.62827 0.120514 8.69916 0.191405L11.0953 2.50244C11.152 2.55442 11.1945 2.60995 11.2229 2.66903C11.2512 2.72811 11.2654 2.79545 11.2654 2.87107C11.2654 3.01758 11.2158 3.13809 11.1165 3.23261C11.0173 3.32713 10.8944 3.37439 10.7479 3.37439C10.5919 3.37439 10.4643 3.31768 10.3651 3.20425L9.28755 2.05583L8.81258 1.5525L8.85512 2.61586V9.89632C8.85512 10.0476 8.79959 10.1775 8.68852 10.2862ZM12.3571 16H4.22596C3.48398 16 2.92748 15.8169 2.55649 15.4506C2.1855 15.0843 2 14.5349 2 13.8024V6.72751C2 5.99498 2.1855 5.44558 2.55649 5.07931C2.92748 4.71304 3.48398 4.52991 4.22596 4.52991H6.20381V5.67124H4.24014C3.88569 5.67124 3.61394 5.76577 3.4249 5.95481C3.23586 6.14385 3.14134 6.42268 3.14134 6.79132V13.7386C3.14134 14.1072 3.23586 14.3861 3.4249 14.5751C3.61394 14.7641 3.88569 14.8587 4.24014 14.8587H12.3358C12.6856 14.8587 12.9573 14.7641 13.1511 14.5751C13.3449 14.3861 13.4417 14.1072 13.4417 13.7386V6.79132C13.4417 6.42268 13.3449 6.14385 13.1511 5.95481C12.9573 5.76577 12.6856 5.67124 12.3358 5.67124H10.3793V4.52991H12.3571C13.0991 4.52991 13.6556 4.71422 14.0266 5.08285C14.3976 5.45148 14.5831 5.9997 14.5831 6.72751V13.8024C14.5831 14.5302 14.3976 15.0784 14.0266 15.4471C13.6556 15.8157 13.0991 16 12.3571 16Z"
        fill="black"
      />
    </svg>
  );
};

const SortingIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.33329 8.66666V3.88333L3.61663 5.59999L2.66663 4.66666L5.99996 1.33333L9.33329 4.66666L8.38329 5.59999L6.66663 3.88333V8.66666H5.33329ZM9.99996 14.6667L6.66663 11.3333L7.61663 10.4L9.33329 12.1167V7.33333H10.6666V12.1167L12.3833 10.4L13.3333 11.3333L9.99996 14.6667Z"
        fill="black"
      />
    </svg>
  );
};

const SearchIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="7" cy="7" r="4.25" stroke="black" strokeWidth="1.5" />
      <path d="M14 14L10.3403 10.3403" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const CheckmarkIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      {...props}
    >
      <path
        d="M4 8.32566L7.09562 12.1594L12.264 4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CloseIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 4L12 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4L4 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const ArrowRightIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 8H13.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 3L13.5 8L8.5 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 5L8.22727 10.2273L13 5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const AccountIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <rect width="20" height="20" fill="url(#pattern0_245_6058)" />
      <defs>
        <pattern id="pattern0_245_6058" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_245_6058" transform="scale(0.03125)" />
        </pattern>
        <image
          id="image0_245_6058"
          width="32"
          height="32"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABdWlDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokXWQvUvDUBTFT6tS0DqIDh0cMolD1NIKdnFoKxRFMFQFq1OafgltfCQpUnETVyn4H1jBWXCwiFRwcXAQRAcR3Zw6KbhoeN6XVNoi3sfl/Ticc7lcwBtQGSv2AijplpFMxKS11Lrke4OHnlOqZrKooiwK/v276/PR9d5PiFlNu3YQ2U9cl84ul3aeAlN//V3Vn8maGv3f1EGNGRbgkYmVbYsJ3iUeMWgp4qrgvMvHgtMunzuelWSc+JZY0gpqhrhJLKc79HwHl4plrbWD2N6f1VeXxRzqUcxhEyYYilBRgQQF4X/8044/ji1yV2BQLo8CLMpESRETssTz0KFhEjJxCEHqkLhz634PrfvJbW3vFZhtcM4v2tpCAzidoZPV29p4BBgaAG7qTDVUR+qh9uZywPsJMJgChu8os2HmwiF3e38M6Hvh/GMM8B0CdpXzryPO7RqFn4Er/QcXKWq8UwZBywAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACPTkDJAAAAy0lEQVRIDWOcHHaDARs4N98KmzBOMaPEY1jlmLCKUlFw6FvAmPhVCB4gnw2Xwdn2Bgpw9sELD+BsZAYuNbzno+DKhn4Q0dwHLPDAAjKQwxRZnBg2st5zSBpo7oOhbwFKHCAFHQNyWcSLLIHERg7r0bIIKWBIY7LgCjvSjEFVjWzm0E+mNPcBSj5ATvu46gbk0EauJ86dR9Tho3GAHEoE2Sh1MnLYIccHQVOACnDppXkqGvoWoOQDXGGNnCeQ1SC3f5DFkdlDP4ho7gMA8uwr82ay+fcAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

const ArrowUpIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 10.2273L8.22727 5.00001L13 10.2273"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ArrowRightBoldIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 8H13.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 3L13.5 8L8.5 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const GasIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1 14.6904C1 14.3896 1.24609 14.1504 1.54004 14.1504H2.08008V1.73633C2.08008 0.615234 2.6748 0 3.80273 0H9.3125C10.4268 0 11.042 0.615234 11.042 1.73633V8.03906H11.1104C12.0264 8.03906 12.5869 8.5791 12.5869 9.52246V11.7852C12.5869 12.1543 12.8057 12.3799 13.1816 12.3799C13.5439 12.3799 13.7627 12.1543 13.7627 11.7852V6.78125L12.6143 5.44824C12.3066 5.08594 12.2656 4.70312 12.5596 4.2998L13.4551 3.04883C13.5371 2.92578 13.5439 2.78223 13.4688 2.65918L12.6689 1.36035C12.3203 0.799805 13.1338 0.300781 13.4824 0.854492L14.4189 2.37207C14.6172 2.68652 14.7266 3.00098 14.7266 3.41113V11.7852C14.7266 12.7559 14.1455 13.3438 13.1816 13.3438C12.2109 13.3438 11.623 12.7559 11.623 11.7852V9.52246C11.623 9.18066 11.4248 9.00293 11.1104 9.00293H11.042V14.1504H11.5684C11.8691 14.1504 12.1221 14.3965 12.1221 14.6904C12.1221 14.998 11.8691 15.251 11.5684 15.251H1.54004C1.23926 15.251 1 14.998 1 14.6904ZM4.02832 7.13672H9.08691C9.58594 7.13672 9.89355 6.86328 9.89355 6.40527V1.89355C9.89355 1.43555 9.58594 1.15527 9.08691 1.15527H4.02832C3.5293 1.15527 3.22852 1.43555 3.22852 1.89355V6.40527C3.22852 6.86328 3.5293 7.13672 4.02832 7.13672Z"
        fill="black"
      />
    </svg>
  );
};

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 8.32566L7.09562 12.1594L12.264 4"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PlusIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 3.5V12.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 8H12.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

const ErrorIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00004 1.33333C4.32004 1.33333 1.33337 4.31999 1.33337 8C1.33337 11.68 4.32004 14.6667 8.00004 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8C14.6667 4.31999 11.68 1.33333 8.00004 1.33333ZM7.33337 11.3333V10H8.66671V11.3333H7.33337ZM7.33337 4.66666V8.66666H8.66671V4.66666H7.33337Z"
        fill="#C10015"
      />
    </svg>
  );
};

const WarningIcon: React.FC<IconProps> = ({ width, height, ...props }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.56298 13.8779C2.58969 13.8779 2 13.2023 2 12.3263C2 12.0573 2.0687 11.7824 2.22328 11.5248L6.66603 3.78435C6.95802 3.26336 7.47328 3 8 3C8.52672 3 9.03626 3.26336 9.33397 3.78435L13.7767 11.5248C13.9198 11.7767 14 12.0573 14 12.3263C14 13.2023 13.4103 13.8779 12.437 13.8779H3.56298ZM8.00573 10.0534C8.28626 10.0534 8.45229 9.8874 8.45802 9.57824L8.54389 6.46947C8.54962 6.16603 8.30916 5.94275 8 5.94275C7.67939 5.94275 7.45611 6.16031 7.46183 6.46374L7.53626 9.57824C7.54198 9.88168 7.70802 10.0534 8.00573 10.0534ZM8.00573 11.9714C8.34351 11.9714 8.64122 11.7023 8.64122 11.3588C8.64122 11.0095 8.34924 10.7405 8.00573 10.7405C7.65649 10.7405 7.3645 11.0153 7.3645 11.3588C7.3645 11.6966 7.66221 11.9714 8.00573 11.9714Z"
        fill="black"
      />
    </svg>
  );
};

const QrUknownTokenIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
      {...props}
    >
      <circle cx="8" cy="8" r="7.5" fill="#D8D8D8" stroke="#979797" />
      <mask id="mask0_135_6353" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
        <circle cx="8" cy="8" r="7.5" fill="white" stroke="white" />
      </mask>
      <g mask="url(#mask0_135_6353)">
        <rect width="16" height="16" fill="url(#pattern0_135_6353)" />
      </g>
      <defs>
        <pattern id="pattern0_135_6353" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_135_6353" transform="scale(0.03125)" />
        </pattern>
        <image
          id="image0_135_6353"
          width="32"
          height="32"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABdWlDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokXWQvUvDUBTFT6tS0DqIDh0cMolD1NIKdnFoKxRFMFQFq1OafgltfCQpUnETVyn4H1jBWXCwiFRwcXAQRAcR3Zw6KbhoeN6XVNoi3sfl/Ticc7lcwBtQGSv2AijplpFMxKS11Lrke4OHnlOqZrKooiwK/v276/PR9d5PiFlNu3YQ2U9cl84ul3aeAlN//V3Vn8maGv3f1EGNGRbgkYmVbYsJ3iUeMWgp4qrgvMvHgtMunzuelWSc+JZY0gpqhrhJLKc79HwHl4plrbWD2N6f1VeXxRzqUcxhEyYYilBRgQQF4X/8044/ji1yV2BQLo8CLMpESRETssTz0KFhEjJxCEHqkLhz634PrfvJbW3vFZhtcM4v2tpCAzidoZPV29p4BBgaAG7qTDVUR+qh9uZywPsJMJgChu8os2HmwiF3e38M6Hvh/GMM8B0CdpXzryPO7RqFn4Er/QcXKWq8UwZBywAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACPTkDJAAAAy0lEQVRIDWOcHHaDARs4N98KmzBOMaPEY1jlmLCKUlFw6FvAmPhVCB4gnw2Xwdn2Bgpw9sELD+BsZAYuNbzno+DKhn4Q0dwHLPDAAjKQwxRZnBg2st5zSBpo7oOhbwFKHCAFHQNyWcSLLIHERg7r0bIIKWBIY7LgCjvSjEFVjWzm0E+mNPcBSj5ATvu46gbk0EauJ86dR9Tho3GAHEoE2Sh1MnLYIccHQVOACnDppXkqGvoWoOQDXGGNnCeQ1SC3f5DFkdlDP4ho7gMA8uwr82ay+fcAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

const PaginationArrowRightIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="icon_right">
        <rect id="placeholder" opacity="0.01" width="16" height="16" fill="white" />
        <g id="right">
          <path
            id="Path"
            d="M11.6318 8.06445C11.6318 8.18294 11.609 8.2946 11.5635 8.39941C11.5179 8.50423 11.4473 8.60221 11.3516 8.69336L6.0332 13.8955C5.87826 14.0505 5.68913 14.1279 5.46582 14.1279C5.31087 14.1279 5.17301 14.0915 5.05225 14.0186C4.93148 13.9456 4.8335 13.8488 4.7583 13.728C4.68311 13.6073 4.64551 13.4717 4.64551 13.3213C4.64551 13.098 4.72982 12.8997 4.89844 12.7266L9.68359 8.06445L4.89844 3.40234C4.72982 3.23372 4.64551 3.03776 4.64551 2.81445C4.64551 2.65951 4.68311 2.52165 4.7583 2.40088C4.8335 2.28011 4.93148 2.18327 5.05225 2.11035C5.17301 2.03743 5.31087 2.00098 5.46582 2.00098C5.68913 2.00098 5.87826 2.07845 6.0332 2.2334L11.3516 7.43555C11.4473 7.52669 11.5179 7.62354 11.5635 7.72607C11.609 7.82861 11.6318 7.94141 11.6318 8.06445Z"
            fill="black"
          />
        </g>
      </g>
    </svg>
  );
};

const PaginationArrowLeftIcon: React.FC<IconProps> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="icon_left">
        <rect id="placeholder copy" opacity="0.01" width="16" height="16" fill="#828282" />
        <g id="left">
          <path
            id="Path"
            d="M4 8.06348C4 8.18197 4.02279 8.29362 4.06836 8.39844C4.11393 8.50326 4.18457 8.60124 4.28027 8.69238L9.59863 13.8945C9.75358 14.0495 9.94271 14.127 10.166 14.127C10.321 14.127 10.4588 14.0905 10.5796 14.0176C10.7004 13.9447 10.7983 13.8478 10.8735 13.7271C10.9487 13.6063 10.9863 13.4707 10.9863 13.3203C10.9863 13.097 10.902 12.8988 10.7334 12.7256L5.94824 8.06348L10.7334 3.40137C10.902 3.23275 10.9863 3.03678 10.9863 2.81348C10.9863 2.65853 10.9487 2.52067 10.8735 2.3999C10.7983 2.27913 10.7004 2.18229 10.5796 2.10938C10.4588 2.03646 10.321 2 10.166 2C9.94271 2 9.75358 2.07747 9.59863 2.23242L4.28027 7.43457C4.18457 7.52572 4.11393 7.62256 4.06836 7.7251C4.02279 7.82764 4 7.94043 4 8.06348Z"
            fill="#828282"
          />
        </g>
      </g>
    </svg>
  );
};

const EtherscanIcon: React.FC<IconProps> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
      <path
        fill="#000"
        d="M3.91 7.642a.593.593 0 0 1 .595-.593l.989.003c.328 0 .594.266.594.594v3.737c.111-.033.253-.068.41-.105a.495.495 0 0 0 .382-.482V6.161c0-.328.266-.594.594-.594h.991c.328 0 .594.266.594.594v4.302s.248-.1.49-.202a.496.496 0 0 0 .303-.456v-5.13c0-.327.265-.593.593-.593h.99c.329 0 .594.266.594.594v4.223c.859-.622 1.729-1.37 2.42-2.27a.997.997 0 0 0 .151-.931 6.994 6.994 0 1 0-12.67 5.78.885.885 0 0 0 .843.437c.187-.017.42-.04.698-.073a.495.495 0 0 0 .439-.491v-3.71ZM3.888 13.635a6.996 6.996 0 0 0 11.094-6.138c-2.556 3.813-7.276 5.595-11.094 6.138Z"
      />
    </svg>
  );
};

export {
  SortingIcon,
  SearchIcon,
  CheckmarkIcon,
  CloseIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  AccountIcon,
  ArrowUpIcon,
  ArrowRightBoldIcon,
  GasIcon,
  CheckIcon,
  PlusIcon,
  ErrorIcon,
  WarningIcon,
  QrUknownTokenIcon,
  PaginationArrowRightIcon,
  PaginationArrowLeftIcon,
  EtherscanIcon,
  ShareIcon,
  NightIcon,
  DayIcon,
  InfoIcon,
  NewWindowIcon,
  CopyIcon,
  ClearCross,
  OfferIcon,
  AcceptOfferIcon,
  SuccessAcceptIcon,
  SmallArrow,
  SelectIcon,
  HistoryIcon,
  InputCross,
  InputError,
  InputSearch,
  CheckboxCheck,
  ButtonPlus,
};
