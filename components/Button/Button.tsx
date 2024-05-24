import React, {memo} from 'react';
import s from './Button.module.scss';

interface ButtonProps {}

const Button: React.FC<ButtonProps> = () => {
  return <div className={s.container}>Hello</div>;
};

export default memo(Button)
