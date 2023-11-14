import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function Dashboard({ shops, orders, linkTitle, getData }) {
  const [lastShop, setLastShop] = useState([]);
  const [lastOrder, setLastOrder] = useState([]);
  const [creditAmount, setCreditAmount] = useState([]);
  const [totalDebit, setTotalDebit] = useState([]);

  useEffect(() => {
    const getShops = shops.filter(
      (item) => shops[shops.length - 1]._id === item._id
    );
    setLastShop(getShops);

    const getOrders = orders.filter(
      (item) => orders[0].order_id === item.order_id
    );

    setLastOrder(getOrders);

    const getCreditAmount = orders.map((item) => item.creditAmount);
    const totalCreditAmount = getCreditAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setCreditAmount(totalCreditAmount);

    const getDebit = shops.flatMap((item) => {
      const history = item.debitHistory.map((debit) => {
        return debit.debitAmount;
      });
      return history;
    });

    const totalDebit = getDebit.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setTotalDebit(totalDebit);
  }, [orders, shops]);

  const options = { maximumFractionDigits: 2 };
  const debitDisplay = Intl.NumberFormat("en-US", options).format(totalDebit);

  const creditDisplay = Intl.NumberFormat("en-US", options).format(
    creditAmount
  );

  const balanceDisplay = Intl.NumberFormat("en-US", options).format(
    creditAmount - totalDebit
  );

  const shopBarGraph = [
    { name: "Shops", Shops: shops.length, pv: shops.length, amt: 2500 },
    { name: "Orders", Orders: orders.length, pv: orders.length, amt: 200 },
  ];

  const balanceGraph = [
    { name: "Credit", Credit: creditAmount, pv: shops.length, amt: 2500 },
    { name: "Debit", Debit: totalDebit, pv: orders.length, amt: 200 },
  ];
  return (
    <>
      <div className="componentTitle">
        <h6>{linkTitle.dashboard.toUpperCase()}</h6>
        <h6>Home / {linkTitle.dashboard}</h6>
      </div>
      <Row
        className="dashboardRow"
        style={{ padding: 0, margin: 0, marginLeft: "20px" }}
      >
        <Col style={{ padding: 0 }}>
          <span className="dashboardSpan">
            <span>
              <i className="fa fa-building-o" aria-hidden="true"></i>
              Total Shops: <h2>{shops.length}</h2>
            </span>
          </span>
        </Col>
        <Col style={{ padding: 0 }}>
          <span className="dashboardSpan">
            <span>
              <i className="fa fa-list-alt" aria-hidden="true"></i>
              Total Orders: <h2>{orders.length}</h2>
            </span>
          </span>
        </Col>

        <Col style={{ padding: 0 }}>
          <span className="dashboardSpan spanCredit">
            Total Credited Amount: <h2>€{creditDisplay}</h2>
          </span>
        </Col>
        <Col style={{ padding: 0 }}>
          <span className="dashboardSpan spanDebit">
            Total Debited Amount:
            <h2>€{debitDisplay}</h2>
          </span>
        </Col>
        <Col style={{ padding: 0 }}>
          <span className="dashboardSpan spanBalance span3">
            Total Balance Amount:
            <h2>€{balanceDisplay}</h2>
          </span>
        </Col>
      </Row>
      <Row
        style={{
          padding: 0,
          margin: 0,
          marginLeft: "20px",
          marginTop: "10px",
        }}
      >
        <Col style={{ padding: 0 }}>
          <span className="dashboardSpan spanMedium">
            Last Shop Added: <br />
            {lastShop.map((shop) => {
              return <p key={shop._id}>{shop.name}</p>;
            })}
          </span>
        </Col>
        <Col style={{ padding: 0, margin: 0 }}>
          <span className="dashboardSpan spanMedium span6 ">
            Last Order Added: <br />
            {lastOrder.map((order) => {
              return (
                <p key={order.order_id}>
                  {order.orderDetails}
                  <br /> by: {order.shopName}
                </p>
              );
            })}
          </span>
        </Col>
      </Row>
      <Row style={{ padding: 0, margin: 0, marginTop: "20px" }}>
        <Col>
          <span className="dashboardRow">
            <BarChart
              className="barGraph"
              width={300}
              height={200}
              data={shopBarGraph}
            >
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="Shops" fill="#8229f9" barSize={30} />
              <Bar dataKey="Orders" fill="#2559f9" barSize={30} />
            </BarChart>
          </span>
        </Col>
        <Col>
          <span className="dashboardRow">
            <BarChart width={300} height={200} data={balanceGraph}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="Credit" fill="#e20606" barSize={30} />
              <Bar dataKey="Debit" fill="#3e8245" barSize={30} />
            </BarChart>
          </span>
        </Col>
      </Row>
    </>
  );
}
