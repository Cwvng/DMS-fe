import { Button, Divider, Form } from 'antd';
import { FloatLabelSelect } from '../../../../../components/input/FloatLabelSelect.tsx';
import { updateStep } from '../../../../../redux/slices/migration-jobs.slice.ts';
import React from 'react';
import { dispatch } from '../../../../../redux/store';
import { PlusOutlined } from '@ant-design/icons';
import { CreateConnectionProfile } from '../../../../../components/profile/CreateConnectionProfile.tsx';
import { DataTable } from '../../../../../components/profile/DataTable.tsx';
import { profile, tableInfo } from './utils.tsx';
import { SideModal } from '../../../../../components/side-modal/SideModal.tsx';

export const DefineSource: React.FC = () => {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <div className="text-lg font-bold "> Define your source</div>
      <div className="mt-3 font-medium">
        Your data source connection profile represents all the info needed to connect. Choose a
        connection profile that already exist, or create a new one. <a>Learn more</a>
      </div>
      <Form className="mt-10">
        <Form.Item>
          <FloatLabelSelect
            label="Select source connection profile"
            optionFilterProp="children"
            showSearch
            filterOption={(input, option) => (option?.label ?? '').toString().includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toString()
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toString().toLowerCase())
            }
            options={[
              {
                value: '1',
                label: 'Not Identified'
              },
              {
                value: '2',
                label: 'Closed'
              },
              {
                value: '3',
                label: 'Communicated'
              },
              {
                value: '4',
                label: 'Identified'
              },
              {
                value: '5',
                label: 'Resolved'
              },
              {
                value: '6',
                label: 'Cancelled'
              }
            ]}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider className="m-0 my-3" />
                <Button
                  className="mb-2"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenModal(true)}>
                  CREATE A CONNECTION PROFILE
                </Button>
              </>
            )}
          />
        </Form.Item>
        {profile && <DataTable data={profile} tableInfo={tableInfo} />}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="mt-5"
            onClick={() => dispatch(updateStep(2))}>
            SAVE & CONTINUE
          </Button>
        </Form.Item>
      </Form>
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
