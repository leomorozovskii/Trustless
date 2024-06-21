import type { FC } from 'react';

import { NewWindowIcon } from '@berezka-dao/shared/icons';

import s from './NewWindowLink.module.scss';

type NewWindowLinkProps = {
  href: string;
};

const NewWindowLink: FC<NewWindowLinkProps> = ({ href }) => {
  return (
    <a className={s.container} href={href} target="_blank" rel="noopener noreferrer">
      <NewWindowIcon />
    </a>
  );
};

export { NewWindowLink };
