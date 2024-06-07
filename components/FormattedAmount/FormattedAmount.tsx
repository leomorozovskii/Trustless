import React from 'react';
import { useTranslation } from 'react-i18next';

interface FormattedNumberProps {
  value: BigInt | string | number | null | undefined;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  decimals?: number;
  className?: string;
  formatValue?: (value: string) => string;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  decimals = 0,
  className,
  formatValue = (val) => val.toString(),
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

  return <span className={className}>{formatValue(formattedValue)}</span>;
};

export default FormattedNumber;
