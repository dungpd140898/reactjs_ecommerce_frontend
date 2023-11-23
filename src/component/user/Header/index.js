import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenData, clearTokenData } from '../../../pages/user/login/authSlice';
import axios from 'axios';
const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.listSP);
 
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


  const handleLogout = () => {
    // Xử lý đăng xuất, dispatch action để xóa thông tin token
    dispatch(clearTokenData());
   window.location.reload();
    
  };
  
  const [listCategory, ganListcategory] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => ganListcategory(data));
  }, []);



  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Trạng thái để quản lý sự hiển thị của dropdown danh mục
  const [categoriesVisible, setCategoriesVisible] = useState(isHomePage);

  // Hàm để chuyển đổi sự hiển thị của dropdown danh mục
  const toggleCategoriesVisibility = () => {
    setCategoriesVisible(!categoriesVisible);
  };

  // Ẩn dropdown khi chuyển sang trang khác
  useEffect(() => {
    setCategoriesVisible(isHomePage);
  }, [isHomePage]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <Link className="text-dark" to="">
                FAQs
              </Link>
              <span className="text-muted px-2">|</span>
              <Link className="text-dark" to="">
                Help
              </Link>
              <span className="text-muted px-2">|</span>
              <Link className="text-dark" to="">
                Support
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <Link className="text-dark px-2" to="">
                <i className="fab fa-facebook-f" />
              </Link>
              <Link className="text-dark px-2" to="">
                <i className="fab fa-twitter" />
              </Link>
              <Link className="text-dark px-2" to="">
                <i className="fab fa-linkedin-in" />
              </Link>
              <Link className="text-dark px-2" to="">
                <i className="fab fa-instagram" />
              </Link>
              <Link className="text-dark pl-2" to="">
                <i className="fab fa-youtube" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <Link to="" className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  E
                </span>
                Shopper
              </h1>
            </Link>
          </div>
          <div className="col-lg-6 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-6 text-right">
            <Link to="" className="btn border">
              <i className="fas fa-heart text-primary" />
              <span className="badge">0</span>
            </Link>
            <Link to="cart" className="btn border">
              <i className="fas fa-shopping-cart text-primary" />
              <span className="badge">{cart.length}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <Link
              className={`btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100 ${categoriesVisible ? 'collapsed' : ''}`}
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
              onClick={(e) => {
                e.preventDefault();
                toggleCategoriesVisibility();
              }}
            >
              <h6 className="m-0">Danh mục</h6>
              <i className={`fa ${categoriesVisible ? 'fa-angle-up' : 'fa-angle-down'} text-dark`} />
            </Link>
            <nav
              className={`collapse ${categoriesVisible ? 'show' : ''} navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0`}
              id="navbar-vertical"
            >
              <div
                className="navbar-nav w-100 overflow-hidden"
                style={{ height: 410 }}
              >
                {listCategory.map((category, i) => (
                  <Link to={`/category/${category._id}`} className="nav-item nav-link">
                    {category['name']}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <Link to="" className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">
                  <span className="text-primary font-weight-bold border px-3 mr-1">
                    E
                  </span>
                  Shopper
                </h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link to="/" className="nav-item nav-link active">
                    Trang chủ
                  </Link>
                  <Link to="/about" className="nav-item nav-link">
                    Giới thiệu
                  </Link>
                  <Link to="/shop" className="nav-item nav-link">
                    Cửa hàng
                  </Link>
                  <Link to="contact.html" className="nav-item nav-link">
                    Liên hệ
                  </Link>
                </div>
                <div className="navbar-nav ml-auto py-0">
                  {userData ? (
                    // Nếu có dữ liệu người dùng, hiển thị tên người dùng và nút đăng xuất
                    <>
                      <Link to='profile' className="nav-item nav-link">
                        {userData['name']}
                      </Link>
                      <Link to="#"  className="nav-item nav-link" onClick={handleLogout}>
                        Đăng xuất
                      </Link>
                    </>
                  ) : (
                    // Nếu không có dữ liệu người dùng, hiển thị nút Đăng nhập và Đăng ký
                    <>
                      <Link to="/login" className="nav-item nav-link">
                        Đăng nhập
                      </Link>
                      <Link to="/register" className="nav-item nav-link">
                        Đăng ký
                      </Link>
                    </>
                  )}
                </div>


              </div>
            </nav>
            {isHomePage && (
              <div
                id="header-carousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active" style={{ height: 410 }}>
                    <img
                      className="img-fluid"
                      src="./assets/img/carousel-1.jpg"
                      alt="Image"
                    />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: 700 }}>
                        <h4 className="text-light text-uppercase font-weight-medium mb-3">
                          GIẢM GIÁ 10% ĐƠN HÀNG ĐẦU TIÊN CỦA BẠN
                        </h4>
                        <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                          Váy thời trang
                        </h3>
                        <Link
                          to="/shop"
                          className="btn btn-light py-2 px-3"
                        >
                          Mua ngay
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item" style={{ height: 410 }}>
                    <img
                      className="img-fluid"
                      src="./assets/img/carousel-2.jpg"
                      alt="Image"
                    />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: 700 }}>
                        <h4 className="text-light text-uppercase font-weight-medium mb-3">
                          10% Off Your First Order
                        </h4>
                        <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                          Reasonable Price
                        </h3>
                        <Link
                          to=""
                          className="btn btn-light py-2 px-3"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  className="carousel-control-prev"
                  href="#header-carousel"
                  data-slide="prev"
                >
                  <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                    <span className="carousel-control-prev-icon mb-n2" />
                  </div>
                </Link>
                <Link
                  className="carousel-control-next"
                  href="#header-carousel"
                  data-slide="next"
                >
                  <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                    <span className="carousel-control-next-icon mb-n2" />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
