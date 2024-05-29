import React, { memo } from 'react';

import { formatCustomDate } from '@lib/utils/handleDate';

interface FormattedDateProps {
  date: string | Date;
}
const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  const formattedDate = formatCustomDate(date);

  return <span>{formattedDate}</span>;
};

export default memo(FormattedDate);
