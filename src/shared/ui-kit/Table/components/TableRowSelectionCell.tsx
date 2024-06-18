'use client';

import type { Row } from '@tanstack/react-table';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@berezka-dao/shared/ui-kit/Checkbox';

import s from '../Table.module.scss';

export const TableRowSelectionCell = <TData,>({ disabled, row }: { disabled?: boolean; row: Row<TData> }) => {
  const { t } = useTranslation();
  const isSelected = row.getIsSelected();
  const handleChange = (checked: boolean) => {
    row.getToggleSelectedHandler()({ target: { checked } });
  };
  return (
    <td
      className={cn(s.rowSelectionCell, {
        [s.rowSelectionCell_selected]: isSelected,
        [s.rowSelectionCell_disabled]: disabled,
      })}
      aria-label={t('shared.selectRow')}
    >
      <Checkbox checked={isSelected} onCheckedChange={handleChange} disabled={disabled} />
    </td>
  );
};
