'use client';

import { ShareIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';

import s from './ShareButton.module.scss';

type ShareButtonProps = {
  url: string;
  title: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    window.navigator.share({ title, url });
  };

  return (
    <button aria-label={t('shared.share')} className={s.container} onClick={handleClick}>
      <ShareIcon />
    </button>
  );
};

export { ShareButton };
