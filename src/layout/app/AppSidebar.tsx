import { Layout, Menu } from 'antd';
import { ItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import React, { useEffect, useState } from 'react';
import { SelectInfo } from 'rc-menu/lib/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { TfiMenuAlt } from 'react-icons/tfi';
import { MdOutlineAccountTree } from 'react-icons/md';
import { BiGlobe } from 'react-icons/bi';
import { FaShareNodes } from 'react-icons/fa6';

interface SidebarProps {
  collapsed: boolean;
}
export const AppSidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [openKey, setOpenKey] = useState(['']);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    for (const item of menuItems) {
      if (location.pathname.includes(item?.key as string)) {
        setSelectedMenu(item?.key as string);
        setOpenKey([item?.key] as string[]);
      }

      const children = (item as SubMenuType)?.children;
      if (children) {
        for (const child of children) {
          if (location.pathname.includes(child?.key as string)) {
            setSelectedMenu(child?.key as string);
            return;
          }
        }
      }
    }
  }, [location.pathname]);

  const handleMenuSelect = ({ key }: SelectInfo) => {
    navigate(key);
  };

  const menuItems: ItemType[] = [
    {
      key: '/',
      label: <span className="font-semibold ">Migration jobs</span>,
      icon: <TfiMenuAlt />
    },
    {
      key: '/conversion-workspaces',
      label: <span className="font-semibold ">Conversion workspaces</span>,
      icon: <MdOutlineAccountTree />
    },

    {
      key: '/connection-profiles',
      label: <span className="font-semibold ">Connection profiles</span>,
      icon: <FaShareNodes />
    },

    {
      key: '/private-connectivity',
      label: <span className="font-semibold ">Private connectivity</span>,
      icon: <BiGlobe />
    }
  ];

  return (
    <Layout.Sider
      className="!bg-white flex flex-col border-1 border-gray-200 border-solid border-t-0"
      collapsible
      collapsed={collapsed}
      collapsedWidth={60}
      width={240}
      trigger={null}>
      <Menu
        style={{ minHeight: '100vh' }}
        items={menuItems}
        mode="inline"
        onSelect={handleMenuSelect}
        selectedKeys={[selectedMenu]}
        openKeys={openKey}
        onOpenChange={setOpenKey}
      />
    </Layout.Sider>
  );
};
