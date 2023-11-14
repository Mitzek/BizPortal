import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import AddShop from "../Shop Components/AddShop";
import DisplayShop from "../Shop Components/DisplayShop";
import Table from "react-bootstrap/Table";
import Pagination from "../Reusable Components/Pagination";

function Shops({
  shops,
  setShops,
  linkTitle,
  alertTitle,
  setAlertTitle,
  showAlert,
  setShowAlert,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [resFromShops, setResFromShops] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(shops.length / itemsPerPage);

  const displayedShops = shops.slice(
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
  }, [resFromShops, shops]);

  const tableColumns = [
    "Serial Number",
    "Date Created",
    "Shop Name",
    "Properitor",
    "Contact",
    "Location",
    "Action",
  ];

  return (
    <>
      {loader ? (
        <div className="loader"></div>
      ) : (
        <Col className="dashboard" xs={{ order: 1 }}>
          <div className="componentTitle">
            <h6>{linkTitle.shops.toUpperCase()}</h6>
            <h6>Home / {linkTitle.shops}</h6>
          </div>
          <div className="pageContainer">
            <Pagination
              title="shops"
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>

          <AddShop
            show={modalShow}
            onHide={() => setModalShow(false)}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertTitle={alertTitle}
            setAlertTitle={setAlertTitle}
          />
          <div className="shopsButtonCol">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Create Shop
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
                <DisplayShop
                  shops={shops}
                  itemsPerPage={itemsPerPage}
                  setShops={setShops}
                  currentPage={currentPage}
                  displayedShops={displayedShops}
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

export default Shops;
