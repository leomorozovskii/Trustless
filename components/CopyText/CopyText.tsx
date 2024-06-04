'use client';

import { CopyIcon } from '@assets/icons';

import { useToastifyContext } from '@context/toastify/ToastifyProvider';
import { useTranslation } from 'react-i18next';
import s from './CopyText.module.scss';

type Props = {
  text: string;
  successMessage: string;
};

const CopyText: React.FC<Props> = ({ text, successMessage }) => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    handleAddItem({ title: t('success.message'), text: successMessage, type: 'success' });
  };
  return (
    <button aria-label={t('shared.copy')} className={s.button} type="button" onClick={handleCopy}>
      <CopyIcon />
    </button>
  );
};

export { CopyText };
