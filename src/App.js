import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Shops from "./Components/Sidebar Components/Shops";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./Components/Layout/Sidebar";
import Container from "react-bootstrap/Container";
import Orders from "./Components/Sidebar Components/Orders";
import DebitHistory from "./Components/Sidebar Components/DebitHistory";
import Footer from "./Components/Footer";
import BalanceSheet from "./Components/Sidebar Components/BalanceSheet";
import axios from "axios";
import { displayShops, displayOrders } from "./Assets/API";
import NavBar from "./Components/Layout/NavBar";
import "./Components/style.css"


function App() {
  const [shops, setShops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [debit, setDebit] = useState([]);
  const [showAlert, setShowAlert] = useState();
  const [alertTitle, setAlertTitle] = useState();
  const [sideBarDisabled, setSideBarDisabled] = useState(
    window.matchMedia("(max-width: 700px)").matches
  );
  
  
    
   

  useEffect(() => {
    
    async function fetchData() {
      try {
        const data = await axios.get(displayShops)
        setShops(data.data.shop.reverse());

     const   order = data.data.shop.flatMap((shop) => {
          return shop.orders.map((order) => ({
            shopName: shop.name,
            orderDetails: order.orderDetails,
            creditAmount: order.amount,
            date: order.updatedAt,
            order_id: order._id,
            shop_id: shop._id
          }));
        }); 
        setOrders(order)

        const amount = data.data.shop.flatMap((shop) => {
          const history = shop.debitHistory.map((history) => ({
            shopID: shop._id,
            shopName: shop.name,
            amount: history.debitAmount,
            date: history.updatedAt,
            debit_id: history._id,
          }));
  
          return history;
        });
  
        setDebit(amount);
    }
    catch (error) {
      console.log(error)
    }
    }
  
    fetchData();
    
  },[])


  

 const linkTitle = {
      dashboard: "Dashboard",
      shops: "Shops",
      orders: "Orders",
      balanceSheet: "Balance Sheet",
      debitHistory: "Debit History",

  }

  const handleSideBarDisplay = () => {
    if (sideBarDisabled) {
      setSideBarDisabled(false);
    } else {
      setSideBarDisabled(true);
    }
  };

  const handleDivClick = () => {
    setSideBarDisabled(true);
  }

  return (
    <>
  
    <div className="App" >
        <BrowserRouter>
      
        <NavBar sideBarDisabled={sideBarDisabled} handleSideBarDisplay={handleSideBarDisplay}/>      
      
        <div className={`container ${sideBarDisabled ? " " : "backgroundShade"}`} onClick={handleDivClick}>
          <Row>
            <Col>
          <Routes>          
          
            <Route path="/dasbhoard" element={<Dashboard showAlert={showAlert} setShowAlert={setShowAlert} alertTitle={alertTitle} setAlertTitle={setAlertTitle} sideBarDisabled={sideBarDisabled} linkTitle={linkTitle} shops={shops} orders={orders}   />} />
            <Route path="/shops" element={<Shops showAlert={showAlert} setShowAlert={setShowAlert} alertTitle={alertTitle} setAlertTitle={setAlertTitle} sideBarDisabled={sideBarDisabled} linkTitle={linkTitle} shops={shops} setShops={setShops} />} />
            <Route path="/orders" element={<Orders showAlert={showAlert} setShowAlert={setShowAlert} alertTitle={alertTitle} setAlertTitle={setAlertTitle} sideBarDisabled={sideBarDisabled} linkTitle={linkTitle} shops={shops} orders={orders} setOrders={setOrders}  />} />
            <Route path="/balancesheet" element={<BalanceSheet showAlert={showAlert} setShowAlert={setShowAlert} alertTitle={alertTitle} setAlertTitle={setAlertTitle} sideBarDisabled={sideBarDisabled} linkTitle={linkTitle} debit={debit} setDebit={setDebit} shops={shops} orders={orders}   />} />
            <Route path="/debitHistory" element={<DebitHistory showAlert={showAlert} setShowAlert={setShowAlert} alertTitle={alertTitle} setAlertTitle={setAlertTitle} sideBarDisabled={sideBarDisabled} linkTitle={linkTitle} debit={debit} setDebit={setDebit} shops={shops}   />}/>
            <Route path="/*" element={<Dashboard  showAlert={showAlert} setShowAlert={setShowAlert} alertTitle={alertTitle} setAlertTitle={setAlertTitle} sideBarDisabled={sideBarDisabled} linkTitle={linkTitle} shops={shops} orders={orders}   />} />
          

         
          
          </Routes>
          </Col>
          </Row>
          </div>
        </BrowserRouter>
        
    </div>
   
    </>
  );
}

export default App;
