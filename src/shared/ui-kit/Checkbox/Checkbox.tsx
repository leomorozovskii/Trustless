'use client';

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import React from 'react';

import { CheckboxCheck } from '@berezka-dao/shared/icons';

import s from './Checkbox.module.scss';

type CheckboxProps = React.HTMLAttributes<HTMLInputElement> & {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, defaultChecked, onCheckedChange, disabled, ...props }) => {
  return (
    <div className={s.wrapper}>
      <RadixCheckbox.Root
        className={s.root}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        checked={checked}
        defaultChecked={defaultChecked}
        id={props.id}
      >
        <RadixCheckbox.Indicator>
          <CheckboxCheck className={s.check} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {!!label && (
        <label className={s.label} htmlFor={props.id}>
          {label}
        </label>
      )}
    </div>
  );
};

export { Checkbox };
