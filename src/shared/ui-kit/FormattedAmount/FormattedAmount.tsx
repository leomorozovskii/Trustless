import React from 'react';
import { useTranslation } from 'react-i18next';

interface FormattedNumberProps {
  value: bigint | string | number | null | undefined;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;
  decimals?: number;
  className?: string;
  formatValue?: (value: string) => string;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  minimumSignificantDigits = 1,
  maximumSignificantDigits = 6,
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
        maximumSignificantDigits,
        minimumSignificantDigits,
      }),
    [i18n.language, maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits, minimumSignificantDigits],
  );

  const formattedValue = formatter.format(Number(value) / 10 ** decimals);

  return <span className={className}>{formatValue(formattedValue)}</span>;
};

export { FormattedNumber };
