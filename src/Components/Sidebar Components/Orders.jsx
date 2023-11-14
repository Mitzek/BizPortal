import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import AddOrder from "../Order Components/AddOrder";

import DisplayOrders from "../Order Components/DisplayOrders";
import Table from "react-bootstrap/Table";
import DebitAmount from "../Debit Components/DebitAmount";
import Pagination from "../Reusable Components/Pagination";

export default function Orders({
  shops,
  shopName,
  linkTitle,
  orders,
  setOrders,
  alertTitle,
  setAlertTitle,
  showAlert,
  setShowAlert,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const displayedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (shops.length > 0) setLoader(false);
  }, [loader, shops, orders]);

  const tableColumns = [
    "Serial Number",
    "Date Created",
    "Shop Name",
    "Order Details",
    "Amount",
    "Action",
  ];

  return (
    <>
      {loader ? (
        <div className="loader"></div>
      ) : (
        <Col className="dashboard" xs={{ order: 1 }}>
          <div className="componentTitle">
            <h6>{linkTitle.orders.toUpperCase()}</h6>
            <h6>Home / {linkTitle.orders}</h6>
          </div>
          <div className="pageContainer">
            <Pagination
              title="orders"
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
          <AddOrder
            show={modalShow}
            onHide={() => setModalShow(false)}
            shops={shops}
            shopName={shopName}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertTitle={alertTitle}
            setAlertTitle={setAlertTitle}
          />

          <div className="shopsButtonCol">
            <Button variant="warning" onClick={() => setModalShow(true)}>
              Create Order
            </Button>

            <div className="search-container">
              <form action="/">
                <input type="text" placeholder="Search.." name="search" />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="tableDiv table-responsive">
            <Table hover className="shopsTable">
              <thead>
                <tr className="table">
                  {tableColumns.map((column, index) => {
                    return <th key={index}>{column}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <DisplayOrders
                  orders={orders}
                  setOrders={setOrders}
                  displayedOrders={displayedOrders}
                  shops={shops}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                  alertTitle={alertTitle}
                  setAlertTitle={setAlertTitle}
                />
              </tbody>
            </Table>
          </div>
        </Col>
      )}
    </>
  );
}
