import React from 'react';
import { useTranslation } from 'react-i18next';

interface FormattedNumberProps {
  value: BigInt | string | number | null | undefined;
  decimals?: number;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  decimals = 2,
}) => {
  const { i18n } = useTranslation(undefined, { useSuspense: false });

  const numberValue =
    value == null || Number.isNaN(Number(value))
      ? BigInt(0)
      : BigInt(value.toString());

  let formatter: Intl.NumberFormat;
  try {
    formatter = new Intl.NumberFormat(i18n.language, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  } catch (error) {
    console.warn('Unsupported locale:', i18n.language);
    formatter = new Intl.NumberFormat('en', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  const formattedValue = formatter.format(
    Number(numberValue) / 10 ** Math.max(0, decimals),
  );

  return <span>{formattedValue}</span>;
};

export default FormattedNumber;
