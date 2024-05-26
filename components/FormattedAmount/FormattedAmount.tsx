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
  const { i18n } = useTranslation(null, { useSuspense: false });

  const numberValue =
    value == null || isNaN(Number(value))
      ? BigInt(0)
      : BigInt(value.toString());

  let formatter;
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
    Number(numberValue) / Math.pow(10, Math.max(0, decimals)),
  );

  return <span>{formattedValue}</span>;
};

export default FormattedNumber;
