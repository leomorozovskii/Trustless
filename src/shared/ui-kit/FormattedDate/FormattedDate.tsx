import type { FC } from 'react';

import { formatCustomDate } from '@berezka-dao/shared/utils/handleDate';

type FormattedDateProps = {
  date: string | Date;
};

const FormattedDate: FC<FormattedDateProps> = ({ date }) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  const formattedDate = formatCustomDate(date);

  return <span>{formattedDate}</span>;
};

export { FormattedDate };
