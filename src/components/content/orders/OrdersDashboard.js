import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { get } from "../../../utils/requests";
import { ordersApi } from "../../../utils/EndPoints";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    getData(ordersApi.getOrders);
  }, []);

  return (
    <Container className="mt-4" fluid>
      <Row className="justify-content-center">
        <Col>
          <div style={{ border: "1px solid #eee" }}>
            <Table responsive hover>
              <thead className="bg-primary">
                <tr>
                  <th className="text-center">ORDER ID</th>
                  <th className="text-center">NAME</th>
                  <th className="text-center">EMAIL</th>
                  <th className="text-center">PHONE NO</th>
                  <th className="text-center">BOOKS</th>
                  <th className="text-center">ORDER TOTAL</th>
                  <th className="text-center">EARNING</th>
                </tr>
              </thead>
              {orders.length > 0 ? (
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="">{order.orderId}</td>
                      <td className="text-center">{order.name}</td>
                      <td className="text-center">{order.email}</td>
                      <td className="text-center">{order.phoneNo}</td>
                      <td className="text-center">{order.booksCount}</td>
                      <td className="text-center">{`Rs.${order.orderTotal}`}</td>
                      <td className="text-center">{`Rs.${order.earning}`}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tr>
                  <td colSpan="100%">
                    <h2 className="w-100 text-center display-4">
                      No subscribers
                    </h2>
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </Col>
      </Row>
      <Row className="pagination justify-content-center mt-3 p-0">
        <Col md={3} className="p-0 m-0">
          <Row className="p-0 m-0">
            <Col onClick={() => {}} className="button">
              <BsChevronLeft size={20} />
            </Col>
            <Col className="button pageNum">
              <span style={{ fontSize: "1.3em" }}>{1}</span>
            </Col>
            <Col onClick={() => {}} className="button m-0">
              <BsChevronRight size={20} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersDashboard;
