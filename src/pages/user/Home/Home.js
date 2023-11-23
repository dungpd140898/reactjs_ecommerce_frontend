import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { themSP } from '../Cart/cartSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const [listsp, ganListSP] = useState([]);
  const [listProductNew, ganListProductNew] = useState([]);
  const [listCategory, ganListcategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryProductsCount, setCategoryProductsCount] = useState({});

  const productsPerPage = 8; // Hiển thị ba sản phẩm mỗi trang

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listsp.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(listsp.length / productsPerPage);
  const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
   
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => ganListSP(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/products/productsnew')
      .then(res => res.json())
      .then(data => {
        ganListProductNew(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => ganListcategory(data));
  }, []);
  const fetchCategoryProductsCount = async () => {
    const counts = {};
    for (const category of listCategory) {
      const response = await fetch(`http://localhost:3001/api/products/count/${category._id}`);
      const data = await response.json();
      counts[category._id] = data.length;
    }
  
    setCategoryProductsCount(counts);
  };
  
  

  useEffect(() => {
    fetchCategoryProductsCount();
  }, [listCategory]);
  

  return (
    <>
      &gt;
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">Sản phẩm chất lượng</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
              <h5 className="font-weight-semi-bold m-0">Miễn phí vận chuyển</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0">Hoàn trả trong 14 ngày</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center border mb-4"
              style={{ padding: 30 }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
              <h5 className="font-weight-semi-bold m-0"> Hỗ trợ 24/7</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          {listCategory.map((category, i) => (
            <div className="col-lg-4 col-md-6 pb-1" key={i}>
              <div
                className="cat-item d-flex flex-column border mb-4"
                style={{ padding: 30 }}
              >
                <p className="text-right">{categoryProductsCount[category._id] || 0}  Sản phẩm</p>
                <Link to={`/category/${category._id}`} className="cat-img position-relative overflow-hidden mb-3">
                  <img className="img-fluid" src={`http://localhost:3001/${category['imageUrl']}`} alt="" />
                </Link>
                <h5 className="font-weight-semi-bold m-0">{category['name']}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid offer pt-5">
        <div className="row px-xl-5">
          <div className="col-md-6 pb-4">
            <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
              <img src="./assets/img/offer-1.png" alt="" />
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h5 className="text-uppercase text-primary mb-3">
                  Giảm 20% cho tất cả đơn hàng
                </h5>
                <h1 className="mb-4 font-weight-semi-bold">Bộ sưu tập mùa xuân</h1>
                <Link to='/shop' className="btn btn-outline-primary py-md-2 px-md-3">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 pb-4">
            <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
              <img src="./assets/img/offer-2.png" alt="" />
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h5 className="text-uppercase text-primary mb-3">
                  Giảm 20% cho tất cả đơn hàng
                </h5>
                <h1 className="mb-4 font-weight-semi-bold">Bộ sưu tập mùa đông</h1>
                <Link to='/shop' className="btn btn-outline-primary py-md-2 px-md-3">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Sản phẩm mới</span>
          </h2>
        </div>
        <div className="row px-xl-5 pb-3">
          {listProductNew.map((sp, i) => (
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={i}>
              <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <img className="img-fluid w-100" src={`http://localhost:3001/${sp['imageUrl']}`} alt="" />
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 className="text-truncate mb-3">{sp['name']}</h6>
                  <div className="d-flex justify-content-center">
                    <h6>${Number(sp['price']).toLocaleString("vi")} </h6>
                    <h6 className="text-muted ml-2">
                      <del>${Number(sp['priceOld']).toLocaleString("vi")}</del>
                    </h6>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                  <Link to={`/shop/${sp._id}`} className="btn btn-sm text-dark p-0">
                    <i className="fas fa-eye text-primary mr-1" />
                    View Detail
                  </Link>
                  <Link onClick={() => { dispatch(themSP(sp)) }} className="btn btn-sm text-dark p-0">
                    <i className="fas fa-shopping-cart text-primary mr-1" />
                    Add To Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid bg-secondary my-5">
        <div className="row justify-content-md-center py-5 px-xl-5">
          <div className="col-md-6 col-12 py-5">
            <div className="text-center mb-2 pb-2">
              <h2 className="section-title px-5 mb-3">
                <span className="bg-secondary px-2">Đăng ký nhận khuyến mãi</span>
              </h2>
              <p>
                "🎉 Đừng bỏ lỡ cơ hội! Đăng ký ngay để nhận thông báo về các khuyến mãi đặc biệt, ưu đãi hấp dẫn và những sản phẩm mới nhất của chúng tôi. 📧✨ Chúng tôi sẽ giữ bí mật thông tin của bạn và chỉ gửi những thông báo quan trọng nhất. Cùng chúng tôi trải nghiệm mua sắm thú vị!"


              </p>
            </div>
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-white p-4"
                  placeholder="email của bạn"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary px-4">Gửi</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Khám phá nhiều hơn</span>
          </h2>
        </div>
        <div className="row px-xl-5 pb-3">
          {currentProducts.map((sp, i) => (
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={i}>
              <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <img className="img-fluid w-100" src={`http://localhost:3001/${sp['imageUrl']}`} alt="" />
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 className="text-truncate mb-3">{sp['name']}</h6>
                  <div className="d-flex justify-content-center">
                    <h6>${Number(sp['price']).toLocaleString("vi")} </h6>
                    <h6 className="text-muted ml-2">
                      <del>${Number(sp['priceOld']).toLocaleString("vi")}</del>
                    </h6>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                  <Link to={`/shop/${sp._id}`} className="btn btn-sm text-dark p-0">
                    <i className="fas fa-eye text-primary mr-1" />
                    View Detail
                  </Link>
                  <Link onClick={() => { dispatch(themSP(sp)) }} className="btn btn-sm text-dark p-0">
                    <i className="fas fa-shopping-cart text-primary mr-1" />
                    Add To Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12 pb-1">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center mb-3">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <Link onClick={() => paginate(currentPage - 1)} className="page-link" href="#">
                    Trước
                  </Link>
                </li>
                {pageNumbers.map((number) => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <Link onClick={() => paginate(number)} className="page-link" href="#">
                      {number}
                    </Link>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <Link onClick={() => paginate(currentPage + 1)} className="page-link" href="#">
                    Tiếp theo
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>

  )
}

export default HomePage;