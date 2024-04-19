import { ProfileItem } from '../../../../../components/profile/type.tsx';
import { ConnectionProfileType } from './type.tsx';

export const tableInfo: ProfileItem[] = [
  { label: 'Connection profile name', key: 'name' },
  { label: 'Connection profile ID', key: 'id' },
  { label: 'Hostname or IP address', key: 'hostname' },
  { label: 'Username', key: 'username' },
  { label: 'Port', key: 'port' }
];
export const profile: ConnectionProfileType = {
  name: 'linhnt-source-db',
  id: 'linhnt-source-db',
  hostname: '12.2.23.123.1',
  username: 'root',
  port: '3306'
};
