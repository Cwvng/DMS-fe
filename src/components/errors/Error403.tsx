import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

export const Error403: React.FC = () => (
  <Result
    title="Page not found"
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
    icon={<img alt="404" src="https://403.ie/wp-content/uploads/2021/10/New-Project-1-svg.svg" />}
  />
);
