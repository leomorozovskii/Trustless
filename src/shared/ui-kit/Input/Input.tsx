import { TextField } from '@radix-ui/themes';
import cn from 'classnames';
import type { ChangeEvent, FC, HTMLAttributes, ReactNode } from 'react';

import s from './Input.module.scss';

interface IInput extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'number' | 'text';
  classWrapper?: string;
  classInput?: string;
  error?: string;
  subtext?: string | ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  label?: string | ReactNode;
}

const Input: FC<IInput> = ({
  type = 'text',
  size = 'md',
  placeholder = '',
  value,
  onChange,
  classWrapper = '',
  classInput = '',
  error = '',
  subtext = '',
  disabled = false,
  icon,
  label = '',
  ...props
}) => {
  return (
    <div className={cn(s.wrapper, classWrapper)}>
      {label && (
        <label className={s.label} htmlFor={props.id}>
          {label}
        </label>
      )}
      <TextField.Root
        className={cn(s.input, classInput, {
          [s.sm]: size === 'sm',
          [s.md]: size === 'md',
          [s.lg]: size === 'lg',
          [s.errorInput]: error,
          [s.disabledInput]: disabled,
        })}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        id={props.id}
        placeholder={placeholder}
      >
        {icon && <TextField.Slot>{icon}</TextField.Slot>}
      </TextField.Root>
      {error ? <p className={s.errorLabel}>{error}</p> : subtext}
    </div>
  );
};

export { Input };
