import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function BalanceTable({ orders, displayedOrders, shops }) {
  const [modalShow, setModalShow] = useState(false);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    const amount = shops.flatMap((shop) => {
      const history = shop.debitHistory.map((history) => ({
        shopName: shop.name,
        debit_amount: history.debitAmount,
        date: history.updatedAt,
        debit_id: history._id,
        shop_id: shop._id,
      }));

      return history;
    });

    const orderCounts = displayedOrders.reduce((acc, order) => {
      acc[order.shopName] = (acc[order.shopName] || 0) + 1;
      return acc;
    }, {});

    const addAmount = displayedOrders.reduce((acc, order) => {
      acc[order.shopName] = (acc[order.shopName] || 0) + order.creditAmount;
      return acc;
    }, {});

    const addDebit = amount.reduce((acc, order) => {
      acc[order.shopName] = (acc[order.shopName] || 0) + order.debit_amount;
      return acc;
    }, {});

    const uniqueShopNames = Array.from(
      new Set(displayedOrders.map((order) => order.shopName))
    );
    const getOrders = displayedOrders.reduce((result, item1) => {
      const combinedItem = { ...item1 };

      combinedItem["orderCount"] = orderCounts[item1.shopName];
      combinedItem["totalCreditAmount"] = addAmount[item1.shopName];
      combinedItem["totalDebit"] = addDebit[item1.shopName];

      if (
        orderCounts[item1.shopName] >= 1 &&
        uniqueShopNames.includes(item1.shopName)
      ) {
        result.push(combinedItem);
        const index = uniqueShopNames.indexOf(item1.shopName);
        uniqueShopNames.splice(index, 1);
      }

      return result;
    }, []);

    setBalance(getOrders);
  }, [displayedOrders, shops]);

  return (
    <>
      {balance.map((bal) => {
        return (
          <tr key={bal.shop_id}>
            <td></td>
            <td>{bal.shopName}</td>
            <td>{bal.orderCount}</td>
            <td style={{ color: "red" }}>
              <strong>€{bal.totalCreditAmount}</strong>
            </td>
            <td style={{ color: "green" }}>
              <strong>
                €{bal.totalDebit === undefined ? 0 : bal.totalDebit}
              </strong>
            </td>
            <td style={{ color: "blue" }}>
              <strong>
                €
                {bal.totalCreditAmount -
                  (bal.totalDebit === undefined ? 0 : bal.totalDebit)}
              </strong>
            </td>
          </tr>
        );
      })}
    </>
  );
}
