import React, { memo, useState } from 'react';
import s from './AddCustomToken.module.scss';
import { useTranslation } from 'react-i18next';
import AddTokenPopup from '@components/AddTokenPopup/AddTokenPopup';

const AddCustomToken: React.FC = () => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div>
      <p onClick={() => setOpened(true)} className={s.label}>
        + {t('offer.create.addToken')}
      </p>
      {opened && <AddTokenPopup setOpened={setOpened} />}
    </div>
  );
};

export default memo(AddCustomToken);
