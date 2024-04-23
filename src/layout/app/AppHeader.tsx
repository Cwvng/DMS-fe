import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, MenuProps } from 'antd';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/slices/user.slice';
import React from 'react';
import { RiLogoutBoxRLine } from '@react-icons/all-files/ri/RiLogoutBoxRLine';
import { IoNotifications } from '@react-icons/all-files/io5/IoNotifications';
import { IoMdSettings } from '@react-icons/all-files/io/IoMdSettings';
import { FaUserCircle } from '@react-icons/all-files/fa/FaUserCircle';
import { IoIosMenu } from '@react-icons/all-files/io/IoIosMenu';
import { selectProjectId } from '../../redux/slices/migration-jobs.slice.ts';
import PrefixSelect from '../../components/input/PrefixSelect.tsx';
import { FaDiagramProject } from 'react-icons/fa6';

interface AppHeaderProps {
  toggleSidebar: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ toggleSidebar }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeUser({}));
    navigate('/login');
  };
  const items: MenuProps['items'] = [
    {
      label: 'Username',
      key: 'mail'
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: 'logout',
      icon: <RiLogoutBoxRLine />
    }
  ];
  const onSelectChange = (value: string) => {
    dispatch(selectProjectId(value));
  };
  return (
    <Header className="bg-white flex flex-row items-center justify-between border-b-1 border-border gap-2 px-4 h-12">
      <div className="flex gap-10 flex-row items-center">
        <Button
          className="border-none bg-transparent"
          onClick={toggleSidebar}
          icon={<IoIosMenu className="text-2xl text-gray-700" />}
        />
        <h2 className="text-primary hover:cursor-pointer" onClick={() => navigate('/')}>
          Database Migration Service
        </h2>
        <PrefixSelect
          defaultValue="123"
          style={{ width: 120 }}
          prefixIcon={<FaDiagramProject />}
          onChange={onSelectChange}
          options={[
            { value: '123', label: 'Linhnt' },
            { value: '234', label: 'Quang' },
            { value: '435', label: 'Linh' }
          ]}
        />{' '}
      </div>
      <div className="flex gap-3">
        <Button
          className="border-none bg-transparent"
          icon={<IoNotifications className="text-2xl text-gray-700" />}></Button>
        <Button
          className="border-none bg-transparent	"
          icon={<IoMdSettings className="text-2xl text-gray-700" />}></Button>
        <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
          <Button className="border-none bg-transparent	flex items-center px-0">
            <FaUserCircle className="text-2xl text-gray-700 align-middle" />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};
