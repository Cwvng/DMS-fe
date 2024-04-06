import { Layout } from 'antd';
import React from 'react';
import { AppHeader } from './AppHeader.tsx';
import { AppSidebar } from './AppSidebar.tsx';

interface IAppLayout {
  children: any;
}
export const AppLayout: React.FC<IAppLayout> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(true);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  return (
    <Layout>
      <AppHeader toggleSidebar={toggleSidebar} />
      <Layout>
        <AppSidebar collapsed={isSidebarCollapsed} />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
