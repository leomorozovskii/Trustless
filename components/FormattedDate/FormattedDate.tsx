import { formatCustomDate } from '@lib/utils/handleDate';
import React, { memo } from 'react';

interface FormattedDateProps {
  date: string | Date;
}
const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return '';
  }

  const formattedDate = formatCustomDate(date);

  return <span>{formattedDate}</span>;
};

export default memo(FormattedDate);
