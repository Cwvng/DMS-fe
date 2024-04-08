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
  return (
    <Header className="bg-white flex flex-row items-center justify-between border-1 border-gray-200 border-solid gap-2 px-4 h-12">
      <div className="flex gap-10 flex-row items-center">
        <Button
          className="border-none bg-transparent"
          onClick={toggleSidebar}
          icon={<IoIosMenu className="text-2xl text-gray-700" />}
        />
        <h2 className="text-primary">HUST WORKSPACE</h2>
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
