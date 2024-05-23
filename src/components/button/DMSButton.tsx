import React, { useMemo } from 'react';
import { Button, ButtonProps } from 'antd';

export enum DMSButtonStyleType {
  PRIMARY = 'primary',
  TEXT = 'text'
}

export const DMSButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { type, ...others } = props;

  const customStyle = useMemo(() => {
    switch (type) {
      case DMSButtonStyleType.PRIMARY:
        return '';
      case DMSButtonStyleType.TEXT:
        return 'text-primary font-bold hover:bg-hoverBg';
      default:
        return '';
    }
  }, [type]);

  return <Button className={customStyle} type={type} {...others} />;
};
