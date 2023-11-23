import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData, clearTokenData } from '../../../pages/user/login/authSlice';
import axios from 'axios';

const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listSP);
  const { accessToken, tokenExpiration } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(setTokenData());

    if (accessToken && tokenExpiration && Date.now() / 1000 < tokenExpiration) {
      axios.get('http://localhost:3001/api/users/user-profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          setUserData(response.data.data.data);
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }

  }, [dispatch, accessToken, tokenExpiration]);

  console.log(userData);

  return (
    <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to='/profile' className="nav-link active" aria-current="page">
              <span data-feather="home" />
              Tài Khoản Của Tôi
            </Link>
          </li>
          <li className="nav-item">
            {userData && userData._id && (
              <Link to={`/profile/orders/${userData._id}`} className="nav-link">
                <span data-feather="file" />
                Đơn Mua
              </Link>
            )}
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="shopping-cart" />
              Thông Báo
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="users" />
              Kho Voucher
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
