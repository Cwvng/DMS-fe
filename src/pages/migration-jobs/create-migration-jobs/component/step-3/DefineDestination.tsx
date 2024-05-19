import { Button, Divider, Form, message } from 'antd';
import { FloatLabelSelect } from '../../../../../components/input/FloatLabelSelect.tsx';
import { updateStep } from '../../../../../redux/slices/migration-jobs.slice.ts';
import React, { useEffect } from 'react';
import { dispatch, useSelector } from '../../../../../redux/store';
import { PlusOutlined } from '@ant-design/icons';
import { ConnectionProfileForm } from '../../../../../components/profile/ConnectionProfileForm.tsx';
import { DataTable } from '../../../../../components/profile/DataTable.tsx';
import { SideModal } from '../../../../../components/side-modal/SideModal.tsx';
import { Connection } from '../../../../../requests/types/connection.interface.ts';
import { useMigrationJobContext } from '../../index.tsx';
import { testConnection } from '../../../../../requests/connection.request.ts';

export const DefineDestination: React.FC = () => {
  const { setTarId, connectionList } = useMigrationJobContext();
  const projectId = useSelector((app) => app.migrationJob.projectId);

  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedSrc, setSelectedSrc] = React.useState<Connection>(connectionList[0]);

  useEffect(() => {
    setTarId(selectedSrc?.conn_id);
  }, [selectedSrc]);

  const testSelectedConnection = async () => {
    try {
      setLoading(true);
      const res = await testConnection(projectId, selectedSrc.conn_id, selectedSrc);
      message.success(res.message);
    } finally {
      setLoading(false);
    }
  };

  if (connectionList)
    return (
      <>
        <div className="text-lg font-bold "> Define your destination</div>
        <div className="mt-3 font-medium">
          Your data destination connection profile represents all the info needed to connect. Choose
          a connection profile that already exist, or create a new one. <a>Learn more</a>
        </div>
        <Form className="mt-10">
          <Form.Item rules={[{ required: true, message: 'Destination is required' }]}>
            <FloatLabelSelect
              label="Select destination connection profile"
              optionFilterProp="children"
              showSearch
              defaultValue={selectedSrc?.conn_id}
              filterOption={(input, option) => (option?.label ?? '').toString().includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toString().toLowerCase())
              }
              options={connectionList?.map((item) => ({
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
          {selectedSrc && (
            <DataTable
              data={selectedSrc}
              tableInfo={[
                { label: 'Connection profile name', key: 'name' },
                { label: 'Hostname or IP address', key: 'host' },
                { label: 'Username', key: 'username' },
                { label: 'Port', key: 'port' }
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
              htmlType="submit"
              className="mt-5 mr-3">
              TEST CONNECTION
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="mt-5"
              onClick={() => dispatch(updateStep(3))}>
              SAVE & CONTINUE
            </Button>
          </Form.Item>
        </Form>
        <SideModal
          title={<div className="font-semibold text-xl">Create connection profile</div>}
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={[
            <Button type="primary" form="myForm" key="submit" htmlType="submit">
              Submit
            </Button>
          ]}
          okText="CREATE"
          cancelText="CANCEL">
          <ConnectionProfileForm closeModal={() => setOpenModal(false)} />
        </SideModal>
      </>
    );
};
