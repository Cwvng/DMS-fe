import React, { useMemo } from 'react';
import { Button, ButtonProps } from 'antd';

export enum DMSButtonStyleType {
  PRIMARY = 'primary',
  TEXT = 'text'
}

type DMSButtonProps = ButtonProps & {
  title: string;
};

export const DMSButton: React.FC<DMSButtonProps> = (props: DMSButtonProps) => {
  const { title, type, ...others } = props;

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

  return (
    <Button className={customStyle} type={type} {...others}>
      {title}
    </Button>
  );
};
