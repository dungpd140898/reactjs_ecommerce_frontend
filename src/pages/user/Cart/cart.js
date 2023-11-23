import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { suaSL, xoaSP, xoaGH } from './cartSlice';
import { Link } from 'react-router-dom';


const CartPage = () => {
  const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.listSP);
    
    const calculateSubtotal = () => {
      return cart.reduce((total, sp) => total + sp.price * sp.soluong, 0);
    };
    const handleQuantityChange = (spId, newQuantity) => {
      // Kiểm tra nếu newQuantity nhỏ hơn 1 thì giữ nguyên là 1
      newQuantity = Math.max(Number(newQuantity), 1);
  
      // Gọi action suaSL với tham số là id sản phẩm và số lượng mới
      dispatch(suaSL([spId, newQuantity]));
    };
    return(
        <>
  <div className="container-fluid bg-secondary mb-5">
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: 150 }}
    >
      <h1 className="font-weight-semi-bold text-uppercase mb-3">
        Shopping Cart
      </h1>
      <div className="d-inline-flex">
        <p className="m-0">
          <a href="">Home</a>
        </p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Shopping Cart</p>
      </div>
    </div>
  </div>
  <div className="container-fluid pt-5">
    <div className="row px-xl-5">
      <div className="col-lg-8 table-responsive mb-5">
        <table className="table table-bordered text-center mb-0">
          <thead className="bg-secondary text-dark">
            <tr>
            <th>Hình ảnh</th>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="align-middle">
          {cart.map((sp, index) => {
            return(
            <tr key={index}>
               <td className="align-middle">
                <img src={`http://localhost:3001/${sp['imageUrl']}`} alt="" style={{ width: 50 }} />{" "}
                
              </td>
              <td className="align-middle">
                {sp.name}
              </td>
              <td className="align-middle">{Number(sp.price).toLocaleString('vi')} $</td>
              <td className="align-middle">
                <div
                  className="input-group quantity mx-auto"
                  style={{ width: 100 }}
                >
                  
                  <input
                    type="number"
                    className="form-control form-control-sm bg-secondary text-center"
                    value={sp.soluong}
                    onFocus={(e) => e.target.select()} // Chọn toàn bộ số liệu khi click vào ô input
                    onChange={(e) => handleQuantityChange(sp._id, e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click từ việc lan tỏa đến cha
                  />
                 
                </div>
              </td>
              <td className="align-middle">{Number(sp.price * sp.soluong).toLocaleString('vi')} $</td>
              <td className="align-middle">
                <button className="btn btn-sm btn-primary" onClick={() => dispatch(xoaSP(sp._id))}>
                  <i className="fa fa-times" />
                </button>
              </td>
            </tr>
                 );
                })}
          </tbody>
        </table>
      </div>
      <div className="col-lg-4">
        <form className="mb-5" action="">
          <div className="input-group">
            <input
              type="text"
              className="form-control p-4"
              placeholder="Mã Giảm Giá"
            />
            <div className="input-group-append">
              <button className="btn btn-primary">Mã Giảm Giá</button>
            </div>
          </div>
        </form>
        <div className="card border-secondary mb-5">
          <div className="card-header bg-secondary border-0">
            <h4 className="font-weight-semi-bold m-0">Tóm Tắt Giỏ Hàng</h4>
          </div>
          <div className="card-body">
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
            <button className="btn btn-block btn-primary my-3 py-3">
              <Link to ='/checkout' style={{ color:'black' }}>Thanh Toán</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    )
}

export default CartPage;