import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddTokenPopup from '@components/AddTokenPopup/AddTokenPopup';

import s from './AddCustomToken.module.scss';

const AddCustomToken: React.FC = () => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setOpened(true)}>
        <p className={s.label}>+ {t('offer.create.addToken')}</p>
      </button>
      {opened && <AddTokenPopup setOpened={setOpened} />}
    </div>
  );
};

export default memo(AddCustomToken);
