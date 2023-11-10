import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './Header/Header';

const Layout = () => {
  return (
    <>
      <AppBar />

      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
