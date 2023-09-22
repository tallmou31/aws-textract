import React from 'react';
import { Image, Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const { Header, Content, Footer } = Layout;
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateRoute = (e) => {
    if (e.key === '/players') {
      //window.location.href = '/players';
      navigate(e.key);
    } else {
      navigate(e.key);
    }
  };

  return (
    <Layout>
      <Header
        className='header-menu'
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className='demo-logo flex items-center gap-3'>
          <Image src={Logo} height={40} width={40} preview={false} />
          <span>Piece Identite OCR</span>
        </div>
        <Menu
          theme='dark'
          mode='horizontal'
          className='flex-1'
          selectedKeys={[location.pathname]}
          onClick={navigateRoute}
          items={[
            {
              key: '/',
              label: 'Accueil',
            },
          ]}
        />
      </Header>
      <Content className='site-layout' style={{ padding: '0 50px' }}>
        <div style={{ padding: 24 }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Piece Identite ©2023 Design by Mouhamed Lamine TALL
      </Footer>
    </Layout>
  );
}

export default AppLayout;
