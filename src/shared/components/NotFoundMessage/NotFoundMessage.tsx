import s from './NotFoundMessage.module.scss';
import { ButtonLink } from '../../ui-kit/Button';

const NotFoundMessage: React.FC = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <p className={s.text}>Seems like nothing found here. Check the link’s address of start from the beginning</p>
      <ButtonLink href="/" className={s.btn}>
        Go to Offers
      </ButtonLink>
    </div>
  );
};

export { NotFoundMessage };
