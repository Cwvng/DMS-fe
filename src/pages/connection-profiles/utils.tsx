import { TableProps } from 'antd';
import { FaEllipsisV } from 'react-icons/fa';

interface DataType {
  key: string;
  displayName: string;
  inUseBy: string;
  dbEngine: string;
  hostname: string;
  created: string;
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Display name',
    dataIndex: 'displayName',
    key: 'displayName',
    filterSearch: true,
    onFilter: (value, record) => record.displayName.startsWith(value as string),
    render: (text: string) => <span>{text}</span>
  },
  {
    title: 'In use by',
    dataIndex: 'inUseBy',
    key: 'inUseBy'
  },
  {
    title: 'Database engine',
    dataIndex: 'dbEngine',
    key: 'dbEngine'
  },
  {
    title: 'Hostname/IP:Port',
    key: 'hostname',
    dataIndex: 'hostname'
  },
  {
    title: 'created',
    key: 'created',
    dataIndex: 'created'
  },
  {
    key: 'action',
    dataIndex: 'action',
    render: () => <FaEllipsisV />
  }
];

export const data: DataType[] = [
  {
    key: 'test',
    displayName: 'test',
    inUseBy: 'test',
    dbEngine: 'test',
    hostname: 'test',
    created: 'test'
  },
  {
    key: 'test',
    displayName: 'test',
    inUseBy: 'test',
    dbEngine: 'test',
    hostname: 'test',
    created: 'test'
  }
];
