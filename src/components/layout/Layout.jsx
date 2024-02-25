import Navbar from 'components/common/Navbar';
import { Outlet } from 'react-router-dom/dist';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
