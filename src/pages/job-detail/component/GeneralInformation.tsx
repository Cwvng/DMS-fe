import { DataTable } from '../../../components/profile/DataTable.tsx';
import React, { useEffect } from 'react';
import { JobDetailResponse } from '../../../requests/types/job.interface.ts';
import { useParams } from 'react-router-dom';
import { AppState, useSelector } from '../../../redux/store';
import { getJobById, updateJob } from '../../../requests/job.request.ts';
import { Loading } from '../../../components/loading/Loading.tsx';
import { Button, Col, Divider, Form, FormProps, Input, message, Row, Select } from 'antd';
import { FaCheck, FaEdit } from 'react-icons/fa';
import { useForm } from 'antd/es/form/Form';
import { ConnectionProfileForm } from '../../../components/profile/ConnectionProfileForm.tsx';
import { SideModal } from '../../../components/side-modal/SideModal.tsx';
import { getConnectionDetail } from '../../../requests/connection.request.ts';
import { Connection } from '../../../requests/types/connection.interface.ts';
import { MigrationType } from '../../../constant';
import { FaX } from 'react-icons/fa6';

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
  const [edit, setEdit] = React.useState(false);

  const updateJobDetail: FormProps['onFinish'] = async (values) => {
    try {
      if (id) {
        await updateJob(projectId, id, values);
        message.success('Updated successfully');
        await getJobDetailById();
      }
    } finally {
      setEdit(false);
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
        <Form form={form} onFinish={updateJobDetail}>
          <Row className="flex justify-between">
            <Col span={22}>
              <Row className="flex justify-between my-1">
                <Col className="font-normal">Migration job name</Col>
                <Col className="flex items-center gap-2">
                  {edit ? (
                    <Form.Item className="m-0" name="name" initialValue={jobDetail.name}>
                      <Input />
                    </Form.Item>
                  ) : (
                    <span className="font-normal">{jobDetail.name}</span>
                  )}
                </Col>
              </Row>
              <Divider className="m-1" />
              <Row className="flex justify-between my-1">
                <Col className="font-normal">Migration job type</Col>
                <Col>
                  {edit ? (
                    <Form.Item name="job_type">
                      <Select
                        defaultValue={jobDetail.job_type}
                        options={[
                          {
                            value: MigrationType.ONE_TIME_MIGRATION,
                            label: 'One-time migration',
                            title:
                              'Contain full dump & load existing data to destination database (only fulldump phase)'
                          },
                          {
                            value: MigrationType.CONTINUOUS_MIGRATION,
                            label: 'Continuous migration',
                            title:
                              'Contain full dump & load existing data (fulldump phase) and capture incremental data to destination database (CDC phase)'
                          }
                        ]}
                      />
                    </Form.Item>
                  ) : (
                    <span className="font-normal">
                      {jobDetail.job_type.charAt(0).toUpperCase() + jobDetail.job_type.slice(1)}
                    </span>
                  )}
                </Col>
              </Row>
            </Col>
            <Col className="mt-2" span={1}>
              {edit ? (
                <div className="flex gap-2 w-[100px]">
                  <FaX
                    className="text-primary text-xxl hover:cursor-pointer"
                    onClick={() => setEdit(false)}
                  />
                  <FaCheck
                    className="text-primary text-xxl hover:cursor-pointer"
                    onClick={() => form.submit()}
                  />
                </div>
              ) : (
                <FaEdit
                  className="text-primary text-xl hover:cursor-pointer"
                  onClick={() => setEdit(true)}
                />
              )}
            </Col>
          </Row>
        </Form>
        <Row className="flex justify-between">
          <Col span={22}>
            <h4 className="m-0 mt-3 text-secondary">Source connection profile</h4>
            <DataTable
              data={srcDetail}
              tableInfo={[
                { label: 'Database engine', key: 'engine' },
                { label: 'Connection profile name', key: 'name' },
                { label: 'Hostname:Port', key: 'host port' }
              ]}
            />
          </Col>
          <Col className="mt-5" span={1}>
            <FaEdit
              onClick={() => setEditSrc(true)}
              className="text-primary text-xl hover:cursor-pointer"
            />
          </Col>
        </Row>
        <Row className="flex justify-between">
          <Col span={22}>
            <h4 className="m-0 mt-3 text-secondary">Destination connection profile</h4>
            <DataTable
              data={tarDetail}
              tableInfo={[
                { label: 'Database engine', key: 'engine' },
                { label: 'Connection profile name', key: 'name' },
                { label: 'Hostname:Port', key: 'host port' }
              ]}
            />
          </Col>
          <Col className="mt-5" span={1}>
            <FaEdit
              onClick={() => setEditTar(true)}
              className="text-primary text-xl hover:cursor-pointer "
            />
          </Col>
        </Row>
        <SideModal
          title={<div className="font-semibold text-xl">Edit connection profile</div>}
          open={editSrc}
          onCancel={() => setEditSrc(false)}
          footer={[
            <Button onClick={() => setEditSrc(false)}>Cancel</Button>,
            <Button type="primary" form="srcForm" key="submit" htmlType="submit">
              Update
            </Button>
          ]}>
          <ConnectionProfileForm
            initialValue={srcDetail}
            closeModal={() => {
              setEditTar(false);
              getJobDetailById();
            }}
            id="srcForm"
          />
        </SideModal>
        <SideModal
          title={<div className="font-semibold text-xl">Edit connection profile</div>}
          open={editTar}
          onCancel={() => setEditTar(false)}
          footer={[
            <Button onClick={() => setEditTar(false)}>Cancel</Button>,
            <Button type="primary" form="tarForm" key="submit" htmlType="submit">
              Update
            </Button>
          ]}>
          <ConnectionProfileForm
            initialValue={tarDetail}
            closeModal={() => {
              setEditTar(false);
              getJobDetailById();
            }}
            id="tarForm"
          />
        </SideModal>
      </div>
    );
};
