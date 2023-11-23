
import './style/css/style.css';
import './style/css/style.min.css'

import RootSiteLayout from './component/user/Rootlayout';
import RootProfileLayout from './component/Profie/RoutProfilelayout.js'
import BigSpinner from './component/BigSpinner/index';
import HomePage from './pages/user/Home/Home';
import ShopPage from './pages/user/Shop/Shop';
import ShopDetailPage from './pages/user/ShopDetail/ShopDetail';
import CartPage from './pages/user/Cart/cart';
import CheckoutPage from './pages/user/Checkout/Checkout';
import ThankYou from './pages/thankyou/thankyou';
import Login from './pages/user/login/login';
import Register from './pages/user/register';
import ProductsByCategory from './pages/user/ProductsByCategory/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData, clearTokenData } from './pages/user/login/authSlice.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserProfile from './pages/user/UserProfile/index.js';
import OrderOfUser from './pages/user/OrderOfUser/index.js'
import OrDerDetail from './pages/OderDetail/index.js';



function App() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);  // Khai báo isAuth ở đây

  useEffect(() => {
    const tokenExpiration = sessionStorage.getItem('tokenExpiration');
    const accessToken = sessionStorage.getItem('accessToken');

    setIsAuth(accessToken && tokenExpiration && Date.now() / 1000 < tokenExpiration);

    if (tokenExpiration && Date.now() / 1000 > tokenExpiration) {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('tokenExpiration');
    }

    if (isAuth) {
      axios.get('http://localhost:3001/api/users/user-profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }
  }, [dispatch, isAuth]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootSiteLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'shop',
          element: <ShopPage />,
          children: [

          ]
          ,

        },
        {
          path: 'shop/:productId',
          element: <ShopDetailPage />
        },
        {
          path: 'cart',
          element: <CartPage />
        },
        {
          path: 'checkout',
          element: isAuth ? <CheckoutPage /> : <Login />
        },
        {
          path: 'thank-you',
          element: <ThankYou />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        }
        ,
        {
          path: 'category/:categoryId',
          element: <ProductsByCategory />
        },
        {
          path: 'profile',
          element: <RootProfileLayout />,
          children: [
            {
              index: true,
              element: <UserProfile />
            }
            ,
            {
              path: 'orders/:userId',
              element: <OrderOfUser />
            },
            {
              path: 'orders/orderdetail/:IdOrder',
              element: <OrDerDetail />
            },

          ]
          ,

        },

      ],
      
    }
  ]);

  return <RouterProvider router={router} fallbackElement={<BigSpinner />} />;
}

export default App;
