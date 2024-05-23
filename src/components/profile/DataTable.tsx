import React from 'react';
import { Col, Divider, Row } from 'antd';
import { ProfileItem } from './type.tsx';

interface ProfileProps {
  data: any;
  tableInfo: ProfileItem[];
}

export const DataTable: React.FC<ProfileProps> = ({ data, tableInfo }) => {
  return (
    <>
      {tableInfo.map((item, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <Divider className="m-0" />}
          <Row className="flex justify-between my-1">
            <Col className="font-normal">{item.label}</Col>
            <Col>
              <span className="font-normal">
                {item.key.split(' ').length > 1
                  ? data[item.key.split(' ')[0]] + ': ' + data[item.key.split(' ')[1]]
                  : data[item.key]}
              </span>
            </Col>
          </Row>
        </React.Fragment>
      ))}
    </>
  );
};
