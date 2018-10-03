import React from 'react';
import { Layout, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

function DefaultLayout({ children, location }) {
  return (
    <LocaleProvider locale={enUS}>
      <Layout>
        <Layout.Header>
          <span><img src="http://morningskatepod.com/wp-content/uploads/2017/09/cropped-Picture1.png" style={{ width: 64, height: 64 }} /></span>
        </Layout.Header>
        <Layout.Content style={{ padding: 16 }}>
            {children}
        </Layout.Content>
      </Layout>
    </LocaleProvider>
  );
}

export default DefaultLayout;
