import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

export const Error404: React.FC = () => (
  <Result
    title="Page not found"
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
    icon={
      <img
        alt="404"
        src="https://premierecreative.com/pitchdeck/2019/10/404-errors-e1575995434550.png"
      />
    }
  />
);
