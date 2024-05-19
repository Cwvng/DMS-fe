import { FaArrowLeft } from 'react-icons/fa';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';

interface PageHeaderProps {
  title: string;
  button?: any;
}
export const PageHeader: React.FC<PageHeaderProps> = ({ title, button }) => {
  const navigate = useNavigate();
  return (
    <Row className="px-5 py-2 flex flex-row items-center gap-2 border-b-1 border-solid border-border">
      <Col span={5}>
        <FaArrowLeft
          className="text-primary hover:cursor-pointer mr-2"
          onClick={() => navigate(-1)}
        />
        <span className="text-xl font-bold">{title}</span>
      </Col>
      {button && (
        <Col span={10} className="flex gap-2 justify-start">
          {button}
        </Col>
      )}
    </Row>
  );
};
