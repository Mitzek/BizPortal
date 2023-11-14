import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import AddOrder from "../Order Components/AddOrder";
import BalanceTable from "../BalanceSheet Components/BalanceTable";
import Table from "react-bootstrap/Table";
import Pagination from "../Reusable Components/Pagination";

export default function Orders({
  shops,
  orders,
  setOrders,
  linkTitle,
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
    if (orders.length > 0) setLoader(false);
  }, [loader, orders]);

  const tableColumns = [
    "Serial Number",
    "Shop Name",
    "Total Orders",
    "Credit",
    "Debit",
    "Balance",
  ];

  return (
    <>
      {loader ? (
        <div className="loader"></div>
      ) : (
        <Col className="dashboard" xs={{ order: 1 }}>
          <div className="componentTitle">
            <h6>{linkTitle.balanceSheet.toUpperCase()}</h6>
            <h6>Home / {linkTitle.balanceSheet}</h6>
          </div>
          <div className="pageContainer">
            <Pagination
              title="balanceSheet"
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
          <div className="shopsButtonCol">
            <div></div>

            <div className="search-container">
              <form action="/action_page.php">
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
                <BalanceTable
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
