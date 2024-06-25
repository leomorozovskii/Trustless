'use client';

import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useToastifyContext } from '@berezka-dao/shared/components/PopupToast';
import { CopyIcon } from '@berezka-dao/shared/icons';

import s from './CopyText.module.scss';

type Props = {
  text: string;
  successMessage: string;
  children?: ReactNode;
  onCopy?(): void;
};

const CopyText: FC<Props> = ({ text, successMessage, children = <CopyIcon />, onCopy }) => {
  const { t } = useTranslation();
  const { handleAddItem } = useToastifyContext();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    handleAddItem({ title: t('success.message'), text: successMessage, type: 'success' });
    if (onCopy) {
      onCopy();
    }
  };
  return (
    <button aria-label={t('shared.copy')} className={s.button} type="button" onClick={handleCopy}>
      {children}
    </button>
  );
};

export { CopyText };
