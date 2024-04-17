import { ConnectionProfileType } from './type.tsx';
import { Col, Divider, Row } from 'antd';

interface ConnectionProfileProps {
  profile: ConnectionProfileType;
}
export const ConnectionProfile: React.FC<ConnectionProfileProps> = ({ profile }) => {
  return (
    <div className="mt-3">
      <Divider className="m-0" />
      <Row className="flex justify-between my-1">
        <Col>Connection profile name</Col>
        <Col>
          <span className="font-medium"> {profile.name}</span>
        </Col>
      </Row>
      <Divider className="m-0" />
      <Row className="flex justify-between my-1">
        <Col>Connection profile ID</Col>
        <Col>
          <span className="font-medium"> {profile.id}</span>
        </Col>
      </Row>
      <Divider className="m-0" />
      <Row className="flex justify-between my-1">
        <Col>Hostname or IP address</Col>
        <Col>
          <span className="font-medium"> {profile.hostname}</span>
        </Col>
      </Row>
      <Divider className="m-0" />
      <Row className="flex justify-between my-1">
        <Col>Port</Col>
        <Col>
          <span className="font-medium"> {profile.port}</span>
        </Col>
      </Row>
      <Divider className="m-0" />
      <Row className="flex justify-between my-1">
        <Col>Username</Col>
        <Col>
          <span className="font-medium"> {profile.username}</span>
        </Col>
      </Row>
      <Divider className="m-0" />

      <div></div>
    </div>
  );
};
