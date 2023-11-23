import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


const OrderDetail = () => {
  const { IdOrder } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    // Lấy chi tiết đơn hàng
    axios.get(`http://localhost:3001/api/orderDetail/${IdOrder}`)
      .then(response => {
        const formattedOrders = response.data.map(order => {
          const formattedDate = new Date(order.createdAt).toLocaleString();

          return {
            ...order,
            createdAt: formattedDate,
          };
        });

        setOrderDetails(formattedOrders);

        // Lấy thông tin sản phẩm cho từng id_product
        const productIds = formattedOrders.map(order => order.id_product);
        fetchProductDetails(productIds);
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
      });
  }, [IdOrder]);

  const fetchProductDetails = (productIds) => {
    const productPromises = productIds.map(productId => (
      axios.get(`http://localhost:3001/api/products/${productId}`)
        .then(response => response.data)
    ));
  
    Promise.all(productPromises)
      .then(products => {
        setOrderDetails(prevOrderDetails => {
          const updatedOrderDetails = prevOrderDetails.map((order, index) => ({
            ...order,
            productDetails: products[index],
          }));
          return updatedOrderDetails;
        });
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      });
  };
  console.log(orderDetails);
  
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Chi Tiết Đơn Hàng</h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Giá sản phẩm</th>
            <th scope="col">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
        {orderDetails.map(order => (
  <tr key={order._id}>
    <th scope="row">
      {order.productDetails && order.productDetails.imageUrl && (
        <img className="img-fluid w-10" src={`http://localhost:3001/${order.productDetails.imageUrl}`} alt="" style={{ width : '150px' }}/>
      )}
    </th>
    <td>{order.productDetails && order.productDetails.name}</td>
    <td>{order.quantity}</td>
    <td>{order.productDetails && order.productDetails.price}</td>
    <td>{order.productDetails && order.productDetails.price * order.quantity}</td>
  </tr>
))}

        </tbody>
      </table>
    </main>
  );
}

export default OrderDetail;
