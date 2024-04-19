import { ProfileItem } from '../../../../../components/profile/type.tsx';
import { MigrationJobType } from './type.tsx';

export const tableInfo: ProfileItem[] = [
  { label: 'Migration job name', key: 'name' },
  { label: 'Source database engine', key: 'source' },
  { label: 'Destination database engine', key: 'destination' },
  { label: 'Type', key: 'type' },
  { label: 'Connection profile name', key: 'connectionName' },
  { label: 'Destination connection profile name', key: 'destinationName' },
  { label: 'Hostname:Port', key: 'hostname' }
];
export const migrationJob: MigrationJobType = {
  name: 'hisis',
  source: 'test',
  destination: 'test',
  type: 'test',
  connectionName: 'test',
  destinationName: 'test',
  hostname: 'test'
};
