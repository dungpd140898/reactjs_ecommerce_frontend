import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Họ tên không được bỏ trống';
    }
    if (!email.trim()) {
      errors.email = 'Email không được bỏ trống';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (!password.trim()) {
      errors.address = 'Địa chỉ không được bỏ trống';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const createUser = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    let url = 'http://localhost:3001/api/users/register';
    let tt = { name: name, email: email, password: password};
    var otp = {
      method: 'post',
      body: JSON.stringify(tt),
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(url, otp)
      .then((res) => res.json())
      .then((data) => {
        if (data._id < 0) {
          console.log('Lỗi đơn hàng', data);
        } else {
          alert('Đăng ký thành công')
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
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Đăng ký</h1>
      <div className="d-inline-flex">
        <p className="m-0">
          <Link to = '/'>Trang chủ</Link>
        </p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Đăng ký</p>
      </div>
    </div>
  </div>
    <div className="container d-flex justify-content-center align-items-center vh-70">
      
        <div className="login-form">
          <form>
            <div className="mb-3">
              <label htmlFor="newUsername" className="form-label">Họ và tên</label>
              <input  className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {validationErrors.name && <span className="error">{validationErrors.name}</span>}
            </div>
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
            <button onClick={createUser} type="submit" className="btn btn-primary">Đăng ký</button>
          </form>
          <Link to='/login' className="register-link" >Bạn đã có tài khoản rồi? Đăng nhập ngay.</Link>
        </div>
    </div>
    </>
  );
}
export default Register;
