import { Button, Divider, Form, FormInstance, message, Skeleton } from 'antd';
import { FloatLabelSelect } from '../../../../../components/input/FloatLabelSelect.tsx';
import { updateStep } from '../../../../../redux/slices/migration-jobs.slice.ts';
import React, { useEffect } from 'react';
import { dispatch, useSelector } from '../../../../../redux/store';
import { PlusOutlined } from '@ant-design/icons';
import { ConnectionProfileForm } from '../../../../../components/profile/ConnectionProfileForm.tsx';
import { DataTable } from '../../../../../components/profile/DataTable.tsx';
import { SideModal } from '../../../../../components/side-modal/SideModal.tsx';
import { Connection } from '../../../../../requests/types/connection.interface.ts';
import {
  getConnectionByProjectId,
  getConnectionDetail,
  testConnection
} from '../../../../../requests/connection.request.ts';
import { CreateJobBody } from '../../../../../requests/types/job.interface.ts';

interface DefineSourceProps {
  form: FormInstance<CreateJobBody>;
}
export const DefineDestination: React.FC<DefineSourceProps> = ({ form }) => {
  const projectId = useSelector((app) => app.migrationJob.projectId);

  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isGetTarget, setIsGetTar] = React.useState(false);
  const [selectedTar, setSelectedTar] = React.useState<Connection>();
  const [connectionList, setConnectionList] = React.useState<Connection[]>();

  const getConnectionList = async () => {
    try {
      setLoading(true);
      const res = await getConnectionByProjectId(projectId);
      setConnectionList(res);
    } finally {
      setLoading(false);
    }
  };

  const testSelectedConnection = async () => {
    try {
      setLoading(true);
      if (selectedTar) {
        await testConnection(projectId, selectedTar.conn_id, selectedTar);
        message.success('Connect successfully');
      }
    } finally {
      setLoading(false);
    }
  };
  const getSelectedTarget = async () => {
    try {
      setIsGetTar(true);
      if (form.getFieldValue('target_id')) {
        const res = await getConnectionDetail(projectId, form.getFieldValue('target_id'));
        setSelectedTar(res);
      }
    } finally {
      setIsGetTar(false);
    }
  };
  useEffect(() => {
    getSelectedTarget();
    getConnectionList();
  }, []);

  if (connectionList)
    return (
      <>
        <div className="text-lg font-bold text-primary"> Define your destination</div>
        <div className="mt-3 font-medium">
          Your data destination connection profile represents all the info needed to connect. Choose
          a connection profile that already exist, or create a new one.
        </div>
        <Form form={form} className="mt-10">
          <Form.Item
            name="target_id"
            rules={[{ required: true, message: 'Destination is required' }]}>
            <FloatLabelSelect
              label="Select destination connection profile"
              optionFilterProp="children"
              showSearch
              allowClear
              defaultValue={form.getFieldValue('target_id')}
              filterOption={(input, option) => (option?.label ?? '').toString().includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toString().toLowerCase())
              }
              options={connectionList
                ?.filter((item) => item.conn_id !== form.getFieldValue('source_id'))
                .map((item) => ({
                  value: item.conn_id,
                  label: item.name
                }))}
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
              onChange={(value) => {
                const src = connectionList?.filter((item) => item.conn_id === value)[0];
                setSelectedTar(src);
              }}
            />
          </Form.Item>
          <Skeleton loading={isGetTarget} active />
          {selectedTar && (
            <DataTable
              data={selectedTar}
              tableInfo={[
                { label: 'Connection profile name', key: 'name' },
                { label: 'Hostname or IP address', key: 'host' },
                { label: 'Port', key: 'port' },
                { label: 'Username', key: 'username' }
              ]}
            />
          )}
          <Form.Item>
            <div className="text-lg font-bold mt-5">Test the migration job</div>
            <div className="mt-3 font-medium">
              Test your connection to make sure all prerequisites were fulfilled to ensure your
              source can connect to your destination
            </div>
            <Button
              loading={loading}
              onClick={() => testSelectedConnection()}
              className="mt-5 mr-3"
              disabled={!selectedTar}>
              TEST CONNECTION
            </Button>
            <Button
              type="primary"
              className="mt-5"
              onClick={async () => {
                await form.validateFields();
                dispatch(updateStep(3));
              }}>
              SAVE & CONTINUE
            </Button>
          </Form.Item>
        </Form>
        <SideModal
          title={<div className="font-semibold text-xl">Create connection profile</div>}
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={[
            <Button type="primary" form="createDestinationForm" key="submit" htmlType="submit">
              Submit
            </Button>
          ]}
          okText="CREATE"
          cancelText="CANCEL">
          <ConnectionProfileForm
            id="createDestinationForm"
            closeModal={() => {
              setOpenModal(false);
              getConnectionList();
            }}
          />
        </SideModal>
      </>
    );
};
