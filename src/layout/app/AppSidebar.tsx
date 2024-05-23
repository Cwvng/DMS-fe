import { Layout, Menu } from 'antd';
import { ItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import React, { useEffect, useState } from 'react';
import { SelectInfo } from 'rc-menu/lib/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { TfiMenuAlt } from 'react-icons/tfi';
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
      icon: <TfiMenuAlt />,
      onClick: () => navigate('/')
    },

    {
      key: '/connection-profiles',
      label: <span className="font-semibold ">Connection profiles</span>,
      icon: <FaShareNodes />,
      onClick: () => navigate('/connection-profiles')
    }
  ];

  return (
    <Layout.Sider
      className="!bg-white flex flex-col border-r-1 border-border"
      collapsible
      collapsed={collapsed}
      collapsedWidth={60}
      width={200}
      trigger={null}>
      <Menu
        className="h-full"
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
