import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import Table from "react-bootstrap/Table";
import DisplayDebit from "../Debit Components/DisplayDebit";
import DebitAmount from "../Debit Components/DebitAmount";
import Pagination from "../Reusable Components/Pagination";

export default function DebitHistory({
  shops,
  linkTitle,
  debit,
  setDebit,
  alertTitle,
  setAlertTitle,
  showAlert,
  setShowAlert,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(debit.length / itemsPerPage);

  const displayedDebit = debit.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (shops.length > 0) {
      setLoader(false);
    }
  }, [loader, shops, debit]);

  const tableColumns = [
    "Serial Number",
    "Date",
    "Shop Name",
    "Debit Amount",
    "Action",
  ];

  return (
    <>
      {loader ? (
        <div className="loader"></div>
      ) : (
        <Col className="dashboard" xs={{ order: 1 }}>
          <div className="componentTitle">
            <h6>{linkTitle.debitHistory.toUpperCase()}</h6>
            <h6>Home / {linkTitle.debitHistory}</h6>
          </div>
          <div className="pageContainer">
            <Pagination
              title="debitHistory"
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
          <DebitAmount
            show={modalShow}
            onHide={() => setModalShow(false)}
            shops={shops}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertTitle={alertTitle}
            setAlertTitle={setAlertTitle}
          />

          <div className="shopsButtonCol">
            <Button
              variant="success"
              style={{ fontSize: "14px" }}
              onClick={() => setModalShow(true)}
            >
              CREATE DEBIT
            </Button>

            <div className="search-container">
              <form action="">
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
                <DisplayDebit
                  debit={debit}
                  setDebit={setDebit}
                  displayedDebit={displayedDebit}
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
