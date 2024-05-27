import React, { HTMLAttributes, memo } from 'react';
import { TextField } from '@radix-ui/themes';
import cn from 'classnames';
import s from './Input.module.scss';

export interface IInput extends HTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'number' | 'text';
  classWrapper?: string;
  error?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode; // Новый пропс для иконки
}

const Input: React.FC<IInput> = ({
  type = 'text',
  size = 'md',
  placeholder = '',
  value,
  onChange,
  classWrapper = '',
  error = '',
  disabled = false,
  icon,
  ...props
}) => {
  return (
    <div className={cn(s.wrapper, classWrapper)}>
      <TextField.Root
        className={cn(s.input, {
          [s.sm]: size === 'sm',
          [s.md]: size === 'md',
          [s.lg]: size === 'lg',
          [s.errorInput]: error,
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
    </div>
  );
};

export default memo(Input);
