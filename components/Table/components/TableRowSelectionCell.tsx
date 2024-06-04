'use client';

import { Checkbox } from '@components/Checkbox';
import { Row } from '@tanstack/react-table';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import s from '../Table.module.scss';

export const TableRowSelectionCell = <TData,>({ row }: { row: Row<TData> }) => {
  const { t } = useTranslation();
  const isSelected = row.getIsSelected();
  const handleChange = (checked: boolean) => {
    row.getToggleSelectedHandler()({ target: { checked } });
  };
  return (
    <td
      className={cn(s.rowSelectionCell, {
        [s.rowSelectionCell_selected]: isSelected,
      })}
      aria-label={t('shared.selectRow')}
    >
      <Checkbox checked={isSelected} onCheckedChange={handleChange} />
    </td>
  );
};
