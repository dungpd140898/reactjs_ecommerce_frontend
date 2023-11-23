// RequireAuthentication.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTokenData, clearTokenData } from '../pages/user/login/authSlice';

const RequireAuthentication = (Component) => {
  const navigate = useNavigate();
  const WrapperComponent = () => {
    const dispatch = useDispatch();
    const { accessToken, tokenExpiration } = useSelector((state) => state.auth);

    useEffect(() => {
      const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
      const storedAccessToken = sessionStorage.getItem('accessToken');

      if (storedTokenExpiration && storedAccessToken) {
        dispatch(
          setTokenData({
            accessToken: storedAccessToken,
            tokenExpiration: storedTokenExpiration,
          })
        );
      }
    }, [dispatch]);

    if (accessToken && tokenExpiration) {
        const currentTime = Math.floor(Date.now() / 1000);
    
        if (currentTime > tokenExpiration) {
          console.log('Token has expired. Handle accordingly.');
          dispatch(clearTokenData());
          // Redirect to login page or perform other actions
          navigate('/login');
          return null;
        } else {
          console.log('Token is valid. Allowing access to the component.');
          // Ensure that Component is a valid React component or function
          return <Component />;
        }
      } else {
        console.log('Token information not found. Handle accordingly.');
        // Redirect to login page or perform other actions
        navigate('/login');
        return null;
      }
  };

  return <WrapperComponent />;
};

export default RequireAuthentication;
