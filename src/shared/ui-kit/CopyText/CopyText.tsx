'use client';

import { useTranslation } from 'react-i18next';

import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { CopyIcon } from '@berezka-dao/shared/icons';

import s from './CopyText.module.scss';

type Props = {
  text: string;
  successMessage: string;
  children?: React.ReactNode;
};

const CopyText: React.FC<Props> = ({ text, successMessage, children = <CopyIcon /> }) => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    handleAddItem({ title: t('success.message'), text: successMessage, type: 'success' });
  };
  return (
    <button aria-label={t('shared.copy')} className={s.button} type="button" onClick={handleCopy}>
      {children}
    </button>
  );
};

export { CopyText };
