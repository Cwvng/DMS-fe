import React from 'react';
import { Col, Row, Table } from 'antd';
import { DMSButton } from '../../components/button/DMSButton.tsx';
import { FaPlusSquare } from 'react-icons/fa';
import { columns, data } from './utils.tsx';
import { VscDebugRestart } from 'react-icons/vsc';
import { CreateConnectionProfile } from '../../components/profile/CreateConnectionProfile.tsx';
import { SideModal } from '../../components/side-modal/SideModal.tsx';

export const ConnectionProfiles: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <>
      <Row className="px-5 py-2 border-b-1 border-solid border-border">
        <Col span={4}>
          <span className="text-xl font-bold">Connection profiles</span>
        </Col>
        <Col span={20}>
          <div className="flex gap-2 justify-start">
            <DMSButton
              icon={<FaPlusSquare />}
              type="text"
              title="CREATE PROFILE"
              onClick={() => setOpenModal(true)}
            />
            <DMSButton disabled icon={<VscDebugRestart />} type="text" title="REFRESH" />
          </div>
        </Col>
      </Row>
      <Row className="p-5">
        <div className="font-normal">
          Connection profiles represent all the info you need to connect to data source{' '}
          <span>
            {' '}
            <a>Learn more</a>
          </span>
        </div>{' '}
      </Row>
      <div className="px-5">
        <Table
          rowSelection={{ type: 'checkbox' }}
          className="w-full"
          columns={columns}
          dataSource={data}
          pagination={{
            position: ['bottomCenter']
          }}
        />
      </div>
      <SideModal
        title={<div className="font-semibold text-xl">Create connection profile</div>}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
        okText="CREATE"
        cancelText="CANCEL">
        <CreateConnectionProfile />
      </SideModal>
    </>
  );
};
