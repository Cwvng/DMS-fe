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
import { Loading } from '../../../../../components/loading/Loading.tsx';

interface DefineSourceProps {
  form: FormInstance<CreateJobBody>;
}
export const DefineSource: React.FC<DefineSourceProps> = ({ form }) => {
  const projectId = useSelector((app) => app.migrationJob.projectId);

  const [openModal, setOpenModal] = React.useState(false);
  const [isGetConnectionDetail, setIsGetConnectionDetail] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isGetTarget, setIsGetTar] = React.useState(false);
  const [selectedSrc, setSelectedSrc] = React.useState<Connection>();
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
      setIsGetConnectionDetail(true);
      if (selectedSrc) {
        await testConnection(projectId, selectedSrc.conn_id, selectedSrc);
        message.success('Connect successfully');
      }
    } finally {
      setIsGetConnectionDetail(false);
    }
  };
  const getSelectedTarget = async () => {
    try {
      setIsGetTar(true);
      if (form.getFieldValue('source_id')) {
        const res = await getConnectionDetail(projectId, form.getFieldValue('source_id'));
        setSelectedSrc(res);
      }
    } finally {
      setIsGetTar(false);
    }
  };
  useEffect(() => {
    getSelectedTarget();
    getConnectionList();
  }, []);
  if (loading) return <Loading />;
  if (connectionList)
    return (
      <>
        <div className="text-lg font-bold text-primary "> Define your source</div>
        <div className="mt-3 font-medium">
          Your data source connection profile represents all the info needed to connect. Choose a
          connection profile that already exist, or create a new one.
        </div>
        <Form form={form} className="mt-10">
          <Form.Item
            name="source_id"
            rules={[{ required: true, message: 'Destination is required' }]}>
            <FloatLabelSelect
              label="Select source connection profile"
              optionFilterProp="children"
              showSearch
              allowClear
              defaultValue={form.getFieldValue('source_id')}
              filterOption={(input, option) => (option?.label ?? '').toString().includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toString().toLowerCase())
              }
              options={connectionList
                ?.filter((item) => item.conn_id !== form.getFieldValue('target_id'))
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
                setSelectedSrc(src);
              }}
            />
          </Form.Item>
          <Skeleton loading={isGetTarget} active />
          {selectedSrc && (
            <DataTable
              data={selectedSrc}
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
              loading={isGetConnectionDetail}
              onClick={() => testSelectedConnection()}
              className="mt-5 mr-3"
              disabled={!selectedSrc}>
              TEST CONNECTION
            </Button>
            <Button
              type="primary"
              className="mt-5"
              onClick={async () => {
                await form.validateFields();
                dispatch(updateStep(2));
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
            <Button type="primary" form="createSrcForm" key="submit" htmlType="submit">
              Submit
            </Button>
          ]}
          okText="CREATE"
          cancelText="CANCEL">
          <ConnectionProfileForm
            id="createSrcForm"
            closeModal={() => {
              setOpenModal(false);
              getConnectionList();
            }}
          />
        </SideModal>
      </>
    );
};
