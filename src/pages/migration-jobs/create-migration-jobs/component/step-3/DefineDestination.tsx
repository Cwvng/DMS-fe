import { Button, Divider, Form } from 'antd';
import { FloatLabelSelect } from '../../../../../components/input/FloatLabelSelect.tsx';
import { updateStep } from '../../../../../redux/slices/migration-jobs.slice.ts';
import React, { useEffect } from 'react';
import { AppState, dispatch, useSelector } from '../../../../../redux/store';
import { PlusOutlined } from '@ant-design/icons';
import { CreateConnectionProfile } from '../../../../../components/profile/CreateConnectionProfile.tsx';
import { DataTable } from '../../../../../components/profile/DataTable.tsx';
import { SideModal } from '../../../../../components/side-modal/SideModal.tsx';
import { getConnectionByProjectId } from '../../../../../requests/connection.request.ts';
import { SrcConnection } from '../../../../../requests/types/connection.interface.ts';

interface DefineDestinationProps {
  setTarId: any;
}
export const DefineDestination: React.FC<DefineDestinationProps> = ({ setTarId }) => {
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);

  const [openModal, setOpenModal] = React.useState(false);
  const [srcList, setSrcList] = React.useState<SrcConnection[]>();
  const [selectedSrc, setSelectedSrc] = React.useState<SrcConnection>();

  const getSrcConnection = async () => {
    try {
      const res = await getConnectionByProjectId(projectId);
      setSrcList(res);
    } finally {
    }
  };

  useEffect(() => {
    setTarId(selectedSrc?.conn_id);
  }, [selectedSrc]);

  useEffect(() => {
    getSrcConnection();
  }, []);

  useEffect(() => {
    getSrcConnection();
  }, [openModal]);
  if (srcList)
    return (
      <>
        <div className="text-lg font-bold "> Define your destination</div>
        <div className="mt-3 font-medium">
          Your data destination connection profile represents all the info needed to connect. Choose
          a connection profile that already exist, or create a new one. <a>Learn more</a>
        </div>
        <Form className="mt-10">
          <Form.Item
            initialValue={srcList[0].conn_id}
            rules={[{ required: true, message: 'Destination is required' }]}>
            <FloatLabelSelect
              label="Select destination connection profile"
              optionFilterProp="children"
              showSearch
              filterOption={(input, option) => (option?.label ?? '').toString().includes(input)}
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toString().toLowerCase())
              }
              options={srcList?.map((item) => ({
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
                const src = srcList?.filter((item) => item.conn_id === value)[0];
                setSelectedSrc(src);
              }}
            />
          </Form.Item>
          {selectedSrc && (
            <DataTable
              data={selectedSrc}
              tableInfo={[
                { label: 'Connection profile name', key: 'name' },
                { label: 'Connection profile ID', key: 'conn_id' },
                { label: 'Hostname or IP address', key: 'host' },
                { label: 'Username', key: 'username' },
                { label: 'Port', key: 'port' }
              ]}
            />
          )}
          <Form.Item>
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
          <CreateConnectionProfile closeModal={() => setOpenModal(false)} />
        </SideModal>
      </>
    );
};
