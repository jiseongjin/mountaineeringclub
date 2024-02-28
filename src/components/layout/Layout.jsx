import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';
import { Outlet } from 'react-router-dom/dist';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
