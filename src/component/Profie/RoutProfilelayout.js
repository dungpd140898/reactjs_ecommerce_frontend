import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const RootProfileLayout = () => {
  return (
    <div className='container-fluid'>
        <div className="row">
      <Header />
      <Outlet />
      <Footer />
      </div>
    </div>
  );
};

export default RootProfileLayout;
