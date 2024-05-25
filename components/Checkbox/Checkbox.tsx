import React, { memo } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import s from './Checkbox.module.scss';
import Image from 'next/image';

export interface ICheckbox extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  disabled?: boolean;
  mixed?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox: React.FC<ICheckbox> = ({
  label,
  checked,
  onCheckedChange,
  disabled,
  ...props
}) => {
  return (
    <div className={s.wrapper}>
      <RadixCheckbox.Root
        className={s.root}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        checked={checked}
        id={props.id}
      >
        <RadixCheckbox.Indicator>
          <Image
            src={'/assets/checkbox/check.svg'}
            alt={'check asset'}
            width={13}
            height={10}
            quality={100}
          />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className={s.label} htmlFor={props.id}>
        {label}
      </label>
    </div>
  );
};

export default memo(Checkbox);
