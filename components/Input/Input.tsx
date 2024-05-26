import React, { HTMLAttributes, memo } from 'react';
import { TextField } from '@radix-ui/themes';
import cn from 'classnames';
import s from './Input.module.scss';

export interface IInput extends HTMLAttributes<HTMLInputElement> {
  type?: 'number' | 'text';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classWrapper?: string;
  error?: string;
  disabled?: boolean;
}

const Input: React.FC<IInput> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  classWrapper = '',
  error = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className={cn(s.wrapper, classWrapper)}>
      <TextField.Root
        className={cn(s.input, error && s.errorInput)}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        id={props.id}
        placeholder={placeholder}
      />
    </div>
  );
};

export default memo(Input);
