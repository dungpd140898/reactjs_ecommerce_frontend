import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email không được bỏ trống';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email không hợp lệ';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const Login = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    let url = 'http://localhost:3001/api/users/login';
    let tt = {  email: email, password: password};
    var otp = {
      method: 'post',
      body: JSON.stringify(tt),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, otp)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert('Đăng nhập thành công')
          sessionStorage.setItem('accessToken',data.data.token);
          sessionStorage.setItem('tokenExpiration', data.data.expiresIn);
          window.location.reload();
          navigate('/');
        } else {
          alert('Email hoặc mật khẩu không chính xác')
          navigate('/login');
        }
      });
  };

  return (
    <>
    <div className="container-fluid bg-secondary mb-5">
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: 150 }}
    >
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Đăng nhập</h1>
      <div className="d-inline-flex">
        <p className="m-0">
          <Link to='/'>Trang chủ</Link>
        </p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Đăng nhập</p>
      </div>
    </div>
  </div>
    <div className="container d-flex justify-content-center align-items-center vh-70">
    
        <div className="login-form">
          <form>
          <div className="mb-3">
              <label htmlFor="newUsername" className="form-label">Email</label>
              <input  className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        {validationErrors.email && <span className="error">{validationErrors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">Mật khẩu</label>
              <input  className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {validationErrors.password && <span className="error">{validationErrors.password}</span>}
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">Nhớ mật khẩu</label>
            </div>
            <button onClick={Login} type="submit" className="btn btn-primary">Đăng nhập</button>
          </form>
          <Link to='/register' className="register-link" >Bạn chưa có tài khoản? Đăng ký.</Link>
        </div>
    </div>
    </>
  );
}

export default Login;
