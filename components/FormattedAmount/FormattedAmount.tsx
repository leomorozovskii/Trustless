import React from 'react';
import { useTranslation } from 'react-i18next';

interface FormattedNumberProps {
  value: BigInt | string | number | null | undefined;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  decimals?: number;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  minimumFractionDigits,
  maximumFractionDigits = 2,
  decimals = 0,
}) => {
  const { i18n } = useTranslation(undefined, { useSuspense: false });

  const formatter = React.useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits,
        maximumFractionDigits,
      }),
    [i18n.language, maximumFractionDigits, minimumFractionDigits],
  );

  const formattedValue = formatter.format(Number(value) / 10 ** decimals);

  return <span>{formattedValue}</span>;
};

export default FormattedNumber;
