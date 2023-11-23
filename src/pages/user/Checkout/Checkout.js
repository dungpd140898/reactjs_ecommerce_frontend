import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { xoaSP, xoaGH } from '../Cart/cartSlice';
import { setTokenData } from '../../../pages/user/login/authSlice';
import axios from 'axios';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.listSP);
    const calculateSubtotal = () => {
      return cart.reduce((total, sp) => total + sp.price * sp.soluong, 0);
    };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const { accessToken, tokenExpiration } = useSelector((state) => state.auth);
  
    // Kiểm tra xem token có hiệu lực hay không
    const isAuth = accessToken && tokenExpiration && Date.now() / 1000 < tokenExpiration;
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      // Lấy dữ liệu từ sessionStorage khi component mount
      dispatch(setTokenData());
  
      // Kiểm tra nếu token hết hạn, xóa thông tin token khỏi sessionStorage
      if (!isAuth) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('tokenExpiration');
      } if (isAuth) {
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
  
      if (!phone.trim()) {
        errors.phone = 'Số điện thoại không được bỏ trống';
      } else if (!/^\d{10,11}$/.test(phone)) {
        errors.phone = 'Số điện thoại không hợp lệ';
      }
  
      if (!address.trim()) {
        errors.address = 'Địa chỉ không được bỏ trống';
      }
  
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    };
    const handlePlaceOrder = (e) => {
      e.preventDefault();
  
      if (!validateForm() && userData ) {
        return;
      }
        const UserId  =  userData._id;
        console.log(UserId);

      let  Totalbill = (calculateSubtotal() + 10)
      let url = 'http://localhost:3001/api/orders';
      let tt = { name: name, email: email, phone: phone, address: address, UserId: UserId, Totalbill: Totalbill };
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
            let id_dh = data._id;
            luuchitietdonhang(id_dh, cart);
            navigate('/thank-you');
          }
        });
    };
  
    const luuchitietdonhang = (id_dh, cart) => {
      let url = 'http://localhost:3001/api/orderDetail';
      cart.forEach((sp) => {
        let t = { id_order: id_dh, id_product: sp._id, quantity: sp.soluong };
        let otp = {
          method: 'post',
          body: JSON.stringify(t),
          headers: { 'Content-Type': 'application/json' },
        };
        fetch(url, otp)
          .then((response) => response.json())
          .then((data) => luuxongsp(data))
          .catch((err) => console.log('loi luu sp', sp));
      });
    };
  
    const luuxongsp = (data) => {
      dispatch(xoaGH());
    };

    return (
        <>
  <div className="container-fluid bg-secondary mb-5">
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: 150 }}
    >
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Thanh Toán</h1>
      <div className="d-inline-flex">
        <p className="m-0">
          <Link href="">Trang chủ</Link>
        </p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Thanh Toán</p>
      </div>
    </div>
  </div>
  <div className="container-fluid pt-5">
    <div className="row px-xl-5">
      <div className="col-lg-8">
        <div className="mb-4">
          <h4 className="font-weight-semi-bold mb-4">Địa chỉ nhận hàng</h4>
          <div className="row">
          <div className="col-md-12 form-group">
              <label>Họ và tên</label>
              <input  className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {validationErrors.name && <span className="error">{validationErrors.name}</span>}
            </div>
            <div className="col-md-12 form-group">
              <label>Email</label>
              <input  className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        {validationErrors.email && <span className="error">{validationErrors.email}</span>}
            </div>
            <div className="col-md-12 form-group">
              <label>Điện thoại</label>
              <input  className="form-control" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {validationErrors.phone && <span className="error">{validationErrors.phone}</span>}
            </div>
            <div className="col-md-12 form-group">
              <label>Địa chỉ</label>
              <input  className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        {validationErrors.address && <span className="error">{validationErrors.address}</span>}
            </div>
            <div className="col-md-12 form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="newaccount"
                />
                <label className="custom-control-label" htmlFor="newaccount">
                  Tạo một tài khoản mới
                </label>
              </div>
            </div>
            <div className="col-md-12 form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="shipto"
                />
                <label
                  className="custom-control-label"
                  htmlFor="shipto"
                  data-toggle="collapse"
                  data-target="#shipping-address"
                >
                  Gửi tới địa chỉ khác
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="collapse mb-4" id="shipping-address">
          <h4 className="font-weight-semi-bold mb-4">Địa chỉ đặt hàng</h4>
          <div className="row">
            <div className="col-md-12 form-group">
              <label>Họ và tên</label>
              <input className="form-control" type="text" placeholder="Nguyen Van A" />
            </div>
            <div className="col-md-12 form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                placeholder="example@email.com"
              />
            </div>
            <div className="col-md-12 form-group">
              <label>Điện thoại</label>
              <input
                className="form-control"
                type="text"
                placeholder="+123 456 789"
              />
            </div>
            <div className="col-md-12 form-group">
              <label>Địa chỉ</label>
              <input
                className="form-control"
                type="text"
                placeholder="123 Street"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        
        <div className="card border-secondary mb-5">
          <div className="card-header bg-secondary border-0">
            <h4 className="font-weight-semi-bold m-0">Tổng đơn hàng</h4>
          </div>
          <div className="card-body">
            <h5 className="font-weight-medium mb-3">Sản phẩm</h5>
            {cart.map((sp, index) => {
            return(
            <div className="d-flex justify-content-between">
              <p>{sp.name}</p>
              <p>{Number(sp.price * sp.soluong).toLocaleString('vi')} $</p>
            </div>
             );
            })}
            <hr className="mt-0" />
            <div className="d-flex justify-content-between mb-3 pt-1">
              <h6 className="font-weight-medium">Tổng Tiền Sản Phẩm</h6>
              <h6 className="font-weight-medium">${calculateSubtotal().toLocaleString('vi')}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="font-weight-medium">Phí Ship</h6>
              <h6 className="font-weight-medium">$10</h6>
            </div>
          </div>
          <div className="card-footer border-secondary bg-transparent">
            <div className="d-flex justify-content-between mt-2">
              <h5 className="font-weight-bold">Tổng Tiền</h5>
              <h5 className="font-weight-bold">${(calculateSubtotal() + 10).toLocaleString('vi')}</h5>
            </div>
          </div>
        </div>
        <div className="card border-secondary mb-5">
          <div className="card-header bg-secondary border-0">
            <h4 className="font-weight-semi-bold m-0">Phương thức thanh toán</h4>
          </div>
          <div className="card-body">
            <div className="form-group">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  name="payment"
                  id="paypal"
                />
                <label className="custom-control-label" htmlFor="paypal">
                  Thanh toán khi nhận hàng
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  name="payment"
                  id="directcheck"
                />
                <label className="custom-control-label" htmlFor="directcheck">
                  Nhận tại cửa hàng
                </label>
              </div>
            </div>
            <div className="">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  name="payment"
                  id="banktransfer"
                />
                <label className="custom-control-label" htmlFor="banktransfer">
                  Chuyển khoản
                </label>
              </div>
            </div>
          </div>
          <div className="card-footer border-secondary bg-transparent">
            <button onClick={handlePlaceOrder} className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    )
}

export default CheckoutPage;