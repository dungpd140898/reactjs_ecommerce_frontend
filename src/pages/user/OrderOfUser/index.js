import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const OrderOfUser = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/orders/user/${userId}`)
      .then(response => {
        const formattedOrders = response.data.map(order => {
          // Format the createdAt date
          const formattedDate = new Date(order.createdAt).toLocaleString();

          return {
            ...order,
            createdAt: formattedDate,
          };
        });

        setOrders(formattedOrders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Orders</h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Ngày đặt hàng</th>
            <th scope="col">Người đặt hàng</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Trạng thái đơn hàng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <th scope="row">{order._id}</th>
              <td>{order.createdAt}</td>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>{order.Totalbill}</td>
              <td>{order.orderStatus}</td>
              <td><Link to={`/profile/orders/orderdetail/${order._id}`}>Xem chi tiết</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default OrderOfUser;
