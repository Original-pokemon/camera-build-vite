import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Modal from '../modals/modal';

const Layout = () => (
  <div className="wrapper">
    <Header />
    <main>

      <Outlet />
      <Modal />
    </main>
    <Footer />
  </div>
);

export default Layout;
