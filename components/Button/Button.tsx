import React, { memo, useMemo } from 'react';
import s from './Button.module.scss';
import cn from 'classnames';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled,
  className,
  ...props
}) => {
  const isIcon = useMemo(() => {
    return React.isValidElement(children) && children.type === 'svg';
  }, [children]);

  return (
    <button
      {...props}
      id={props.id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(s.button, className, s[variant], { [s.icon]: isIcon })}
    >
      {children}
    </button>
  );
};

export default memo(Button);
