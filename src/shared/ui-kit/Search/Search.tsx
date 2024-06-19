import { TextField } from '@radix-ui/themes';
import cn from 'classnames';
import type { ChangeEvent, FC, HTMLAttributes } from 'react';
import { useMemo } from 'react';

import { InputCross, InputError, InputSearch } from '@berezka-dao/shared/icons';

import s from './Search.module.scss';

type SearchProps = HTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'number';
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classWrapper?: string;
  error?: string;
  disabled?: boolean;
};

const Search: FC<SearchProps> = ({
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
    onChange({ currentTarget: { value: '' } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <TextField.Root
      type={type}
      id={props.id}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={cn(s.input, error && s.errorInput, classWrapper, disabled && s.disabled)}
    >
      <TextField.Slot>{!disabled && <InputSearch className={cn(s.searchAsset, s.asset)} />}</TextField.Slot>
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

export { Search };
