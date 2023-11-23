import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData } from '../login/authSlice';
import axios from 'axios';;

const UserProfile = () => {

    const dispatch = useDispatch();
    const { accessToken, tokenExpiration } = useSelector((state) => state.auth);

    // Kiểm tra xem token có hiệu lực hay không
    const isAuth = accessToken && tokenExpiration && Date.now() / 1000 < tokenExpiration;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu từ sessionStorage khi component mount
        dispatch(setTokenData());
        if (isAuth) {
            // Nếu token hợp lệ, gửi yêu cầu API để lấy thông tin người dùng
            axios.get('http://localhost:3001/api/users/user-profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then(response => {
                    // Lưu trữ thông tin người dùng trong state
                    setUserData(response.data.data.data);

                })
                .catch(error => {
                    console.error('Lỗi khi lấy thông tin người dùng:', error);
                });
        }

    }, [dispatch, isAuth, accessToken, tokenExpiration]);

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>

            <div className="user-profile">

                <img src='' alt="User Profile" className="profile-image" />

                <div className="user-info" style={{ marginLeft: '30px' }}>
                    {userData ? (
                        <>
                            <h2>{userData.name}</h2>
                            <p>Email: {userData.email}</p>
                            <p>Phone: {userData.phone}</p>
                            <p>Address: {userData.address}</p>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </div>
            {/* Nội dung trang dashboard và các tab khác */}
            <div className="tab-content" id="v-pills-tabContent">
                {/* Content for Dashboard */}
                <div
                    className="tab-pane fade show active"
                    id="v-pills-dashboard"
                    role="tabpanel"
                    aria-labelledby="v-pills-dashboard-tab"
                >
                    {/* Your Dashboard Content */}
                </div>
                {/* Content for Orders */}
                <div
                    className="tab-pane fade"
                    id="v-pills-orders"
                    role="tabpanel"
                    aria-labelledby="v-pills-orders-tab"
                >
                    {/* Your Orders Content */}
                </div>
                {/* Add more tabs content here */}
            </div>
        </main>
    );
};

export default UserProfile;
