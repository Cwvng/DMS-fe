import './assets/styles/index.scss';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './pages';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          hashed: false,
          components: {
            Layout: { colorBgBase: '#ee2121' },
            Menu: {
              iconSize: 20,
              collapsedIconSize: 15,
              itemSelectedBg: 'rgba(228,35,56,0.11)',
              itemSelectedColor: '#e42338',
              itemColor: '#a1a0a0'
            }
          },
          token: {
            colorPrimary: '#e42338'
          }
        }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
