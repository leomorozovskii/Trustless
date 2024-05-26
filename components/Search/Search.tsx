import React, { HTMLAttributes, memo, useMemo } from 'react';
import s from './Search.module.scss';
import cn from 'classnames';
import { TextField } from '@radix-ui/themes';
import { InputCross, InputError, InputSearch } from '@assets/icons';

export interface ISearch extends HTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classWrapper?: string;
  error?: string;
  disabled?: boolean;
}

const Search: React.FC<ISearch> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  classWrapper = '',
  error = '',
  disabled = false,
  ...props
}) => {
  const withCross = useMemo(() => {
    return value.length > 0;
  }, [value]);

  const handleClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <TextField.Root
      type={type}
      id={props.id}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={cn(s.input, error && s.errorInput)}
    >
      <TextField.Slot>
        {!disabled && <InputSearch className={cn(s.searchAsset, s.asset)} />}
      </TextField.Slot>
      <TextField.Slot>
        {withCross && !error && !disabled ? (
          <InputCross onClick={handleClear} className={cn(s.cross, s.asset)} />
        ) : (
          error && <InputError className={s.errorAsset} />
        )}
      </TextField.Slot>
    </TextField.Root>
  );
};

export default memo(Search);
