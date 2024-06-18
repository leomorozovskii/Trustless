import { parseISO } from 'date-fns';
import { t } from 'i18next';

export const formatCustomDate = (date: string | Date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Invalid Date';
  }

  return t('dateFormats.custom', {
    date: parsedDate,
  });
};
