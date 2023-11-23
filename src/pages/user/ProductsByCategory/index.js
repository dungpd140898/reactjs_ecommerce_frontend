import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, } from 'react-redux'
import { themSP } from '../Cart/cartSlice';



const ProductsByCategory = () => {
  const dispatch  = useDispatch();
  let { categoryId } = useParams();
   const [ listsp, ganListSP] = useState([]);
   const [ loai, ganLoai] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [searchResults, setSearchResults] = useState([]);
   
   const paginate = (pageNumber) => {
     setCurrentPage(pageNumber);
   };
   useEffect(() =>{
    fetch("http://localhost:3001/api/products/category/" +  categoryId)
    .then(res => res.json()).then(data => ganListSP(data));
    fetch("http://localhost:3001/api/categories/" + categoryId)
    .then(res => res.json()).then(data => ganLoai(data));
   }, [categoryId] );
   const [sortBy, setSortBy] = useState('latest');

   const handleSortChange = (option) => {
     setSortBy(option);
   };
 
   const sortedProducts = () => {
     switch (sortBy) {
       case 'latest':
         return [...listsp].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
       case 'bestRating':
         // Thêm logic sắp xếp theo đánh giá tốt nhất, tùy thuộc vào yêu cầu của bạn
         return [...listsp].sort((a, b) => a.price - b.price);
       case 'lowToHigh':
         return [...listsp].sort((a, b) => a.price - b.price);
       case 'highToLow':
         return [...listsp].sort((a, b) => b.price - a.price);
       default:
         return listsp;
     }
   };

   const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filteredProducts = listsp.filter((sp) =>
      sp.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchResults(filteredProducts);
  };


   const [currentPage, setCurrentPage] = useState(1);
   const productsPerPage = 6; // Hiển thị ba sản phẩm mỗi trang
 
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = sortedProducts().slice(indexOfFirstProduct, indexOfLastProduct);
 
   const totalPages = Math.ceil(sortedProducts().length / productsPerPage);
   const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1);
 
    return (
        <>
  <div className="container-fluid bg-secondary mb-5">
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: 150 }}
    >
      <h1 className="font-weight-semi-bold text-uppercase mb-3">{loai['name']}</h1>
      <div className="d-inline-flex">
        <p className="m-0">
          <Link to='/'>Trang chủ</Link>
        </p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">{loai['name']}</p>
      </div>
    </div>
  </div>
  <div className="container-fluid pt-5">
    <div className="row px-xl-5">
      <div className="col-lg-3 col-md-12">
        <div className="border-bottom mb-4 pb-4">
          <h5 className="font-weight-semi-bold mb-4">Lọc theo giá</h5>
          <form>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked=""
                id="price-all"
              />
              <label className="custom-control-label" htmlFor="price-all">
                Tất cả
              </label>
              <span className="badge border font-weight-normal">1000</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="price-1"
              />
              <label className="custom-control-label" htmlFor="price-1">
                $0 - $100
              </label>
              <span className="badge border font-weight-normal">150</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="price-2"
              />
              <label className="custom-control-label" htmlFor="price-2">
                $100 - $200
              </label>
              <span className="badge border font-weight-normal">295</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="price-3"
              />
              <label className="custom-control-label" htmlFor="price-3">
                $200 - $300
              </label>
              <span className="badge border font-weight-normal">246</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="price-4"
              />
              <label className="custom-control-label" htmlFor="price-4">
                $300 - $400
              </label>
              <span className="badge border font-weight-normal">145</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
              <input
                type="checkbox"
                className="custom-control-input"
                id="price-5"
              />
              <label className="custom-control-label" htmlFor="price-5">
                $400 - $500
              </label>
              <span className="badge border font-weight-normal">168</span>
            </div>
          </form>
        </div>
        <div className="mb-5">
          <h5 className="font-weight-semi-bold mb-4">Lọc theo size</h5>
          <form>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked=""
                id="size-all"
              />
              <label className="custom-control-label" htmlFor="size-all">
                Tất cả 
              </label>
              <span className="badge border font-weight-normal">1000</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="size-1"
              />
              <label className="custom-control-label" htmlFor="size-1">
                XS
              </label>
              <span className="badge border font-weight-normal">150</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="size-2"
              />
              <label className="custom-control-label" htmlFor="size-2">
                S
              </label>
              <span className="badge border font-weight-normal">295</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="size-3"
              />
              <label className="custom-control-label" htmlFor="size-3">
                M
              </label>
              <span className="badge border font-weight-normal">246</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="size-4"
              />
              <label className="custom-control-label" htmlFor="size-4">
                L
              </label>
              <span className="badge border font-weight-normal">145</span>
            </div>
            <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
              <input
                type="checkbox"
                className="custom-control-input"
                id="size-5"
              />
              <label className="custom-control-label" htmlFor="size-5">
                XL
              </label>
              <span className="badge border font-weight-normal">168</span>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-9 col-md-12">
        <div className="row pb-3">
          <div className="col-12 pb-1">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <form action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm sản phẩm"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text bg-transparent text-primary">
                      <i className="fa fa-search" />
                    </span>
                  </div>
                </div>
              </form>
              <div className="dropdown ml-4">
                <button
                  className="btn border dropdown-toggle"
                  type="button"
                  id="triggerId"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sắp xếp theo
                </button>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="triggerId"
                >
                   <button
                        className={`dropdown-item ${sortBy === 'latest' ? 'active' : ''}`}
                        onClick={() => handleSortChange('latest')}
                      >
                        Thời gian
                      </button>
                      <button
                        className={`dropdown-item ${sortBy === 'bestRating' ? 'active' : ''}`}
                        onClick={() => handleSortChange('bestRating')}
                      >
                        Mua nhiều
                      </button>
                      <button
                        className={`dropdown-item ${sortBy === 'lowToHigh' ? 'active' : ''}`}
                        onClick={() => handleSortChange('lowToHigh')}
                      >
                        Giá từ thấp tới cao
                      </button>
                      <button
                        className={`dropdown-item ${sortBy === 'highToLow' ? 'active' : ''}`}
                        onClick={() => handleSortChange('highToLow')}
                      >
                        Giá từ cao tới thấp
                      </button>
                </div>
              </div>
            </div>
          </div>
          {searchTerm ? (
                searchResults.map((sp, i) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={i}>
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
                ))
              ) : (
                currentProducts.map((sp, i) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={i}>
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
                ))
              )}
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
    </div>
  </div>
  <a href="#" className="btn btn-primary back-to-top">
    <i className="fa fa-angle-double-up" />
  </a>
</>

    )
}

export default  ProductsByCategory;