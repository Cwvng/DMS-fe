import { DataTable } from '../../../components/profile/DataTable.tsx';
import React, { useEffect } from 'react';
import { JobDetailResponse } from '../../../requests/types/job.interface.ts';
import { useParams } from 'react-router-dom';
import { AppState, useSelector } from '../../../redux/store';
import { getJobById, updateJob } from '../../../requests/job.request.ts';
import { Loading } from '../../../components/loading/Loading.tsx';
import { Button, Col, Form, FormProps, Input, message, Row } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { useForm } from 'antd/es/form/Form';
import { ConnectionProfileForm } from '../../../components/profile/ConnectionProfileForm.tsx';
import { SideModal } from '../../../components/side-modal/SideModal.tsx';
import { getConnectionDetail } from '../../../requests/connection.request.ts';
import { Connection } from '../../../requests/types/connection.interface.ts';

export const GeneralInformation: React.FC = () => {
  const { id } = useParams();
  const projectId = useSelector((app: AppState) => app.migrationJob.projectId);
  const [form] = useForm();

  const [jobDetail, setJobDetail] = React.useState<JobDetailResponse>();
  const [srcDetail, setSrcDetail] = React.useState<Connection>();
  const [tarDetail, setTarDetail] = React.useState<Connection>();
  const [loading, setLoading] = React.useState(false);
  const [editSrc, setEditSrc] = React.useState(false);
  const [editTar, setEditTar] = React.useState(false);
  const [editName, setEditName] = React.useState(false);

  const updateJobName: FormProps['onFinish'] = async (values) => {
    try {
      if (id) {
        await updateJob(projectId, id, { name: values.name });
        message.success('Updated successfully');
        await getJobDetailById();
      }
    } finally {
      setEditName(false);
    }
  };

  const getJobDetailById = async () => {
    try {
      if (id) {
        setLoading(true);
        const res = await getJobById(projectId, id);
        setJobDetail(res);
        const src = await getConnectionDetail(projectId, res.source_id);
        setSrcDetail(src);
        const tar = await getConnectionDetail(projectId, res.target_id);
        setTarDetail(tar);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobDetailById();
  }, []);

  if (loading) return <Loading />;
  if (jobDetail)
    return (
      <div className="w-1/2 flex flex-col gap-3">
        <div>
          <Row className="flex justify-between my-1">
            <Col>Migration job name</Col>
            <Form form={form} onFinish={updateJobName}>
              <Col className="flex items-center gap-2">
                {editName ? (
                  <Form.Item className="m-0" name="name" initialValue={jobDetail.name}>
                    <Input onBlur={() => setEditName(false)} />
                  </Form.Item>
                ) : (
                  <>
                    <FaEdit
                      onClick={() => setEditName(true)}
                      className="text-primary hover:cursor-pointer opacity-0 hover:opacity-100"
                    />
                    <span className="font-medium">{jobDetail.name}</span>
                  </>
                )}
              </Col>
            </Form>
          </Row>
          <Row className="flex justify-between my-1">
            <Col>Migration job type</Col>
            <Col>
              <span className="font-medium">{jobDetail.job_type}</span>
            </Col>
          </Row>
        </div>
        <div>
          <div className="flex justify-between items-center text-center">
            <h4 className="text-secondary">Source connection profile</h4>
            <FaEdit
              onClick={() => setEditSrc(true)}
              className="text-primary text-xl hover:cursor-pointer opacity-0 hover:opacity-100"
            />
          </div>
          <DataTable
            data={srcDetail}
            tableInfo={[
              { label: 'Database engine', key: 'engine' },
              { label: 'Connection profile name', key: 'name' },
              { label: 'Hostname:Port', key: 'host port' }
            ]}
          />
        </div>
        <div>
          <div className="flex justify-between items-center text-center">
            <h4 className="text-secondary">Destination connection profile</h4>
            <FaEdit
              onClick={() => setEditTar(true)}
              className="text-primary text-xl hover:cursor-pointer opacity-0 hover:opacity-100"
            />
          </div>
          <DataTable
            data={tarDetail}
            tableInfo={[
              { label: 'Database engine', key: 'engine' },
              { label: 'Connection profile name', key: 'name' },
              { label: 'Hostname:Port', key: 'host port' }
            ]}
          />
        </div>
        <SideModal
          title={<div className="font-semibold text-xl">Create connection profile</div>}
          open={editSrc}
          onCancel={() => setEditSrc(false)}
          footer={[
            <Button onClick={() => setEditSrc(false)}>Cancel</Button>,
            <Button type="primary" form="myForm" key="submit" htmlType="submit">
              Update
            </Button>
          ]}>
          <ConnectionProfileForm initialValue={srcDetail} closeModal={() => setEditSrc(false)} />
        </SideModal>
        <SideModal
          title={<div className="font-semibold text-xl">Create connection profile</div>}
          open={editTar}
          onCancel={() => setEditTar(false)}
          footer={[
            <Button onClick={() => setEditTar(false)}>Cancel</Button>,
            <Button type="primary" form="myForm" key="submit" htmlType="submit">
              Update
            </Button>
          ]}>
          <ConnectionProfileForm initialValue={tarDetail} closeModal={() => setEditTar(false)} />
        </SideModal>
      </div>
    );
};
