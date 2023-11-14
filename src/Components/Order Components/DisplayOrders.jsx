import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { deleteOrder } from "../../Assets/API";
import DeleteOrder from "./DeleteOrder";
import EditOrder from "./EditOrder";

export default function DisplayOrders({
  orders,
  setOrders,
  displayedOrders,
  shops,
  showAlert,
  setShowAlert,
  alertTitle,
  setAlertTitle,
}) {
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selected, setSelected] = useState();

  const handleClick = (shop) => {
    setSelected(shop);
  };

  async function handleDelete(idObject) {
    const { shop_id, order_id } = idObject;

    const { data } = await axios.delete(
      `${deleteOrder}/${shop_id}/${order_id}`
    );

    if (data.status === true) {
      setAlertTitle("success");
      setShowAlert(true);
      console.log(data.msg);
    } else {
      setAlertTitle("fail");
      setShowAlert(true);
      console.log(data.msg);
    }

    const updatedOrders = orders.filter((item) => item.order_id !== order_id);

    setOrders(updatedOrders);
    setDeleteModalShow(false);
  }

  function dateFromObjectId(objectId) {
    const timeStamp = parseInt(objectId.substring(0, 8), 16) * 1000;
    const date = new Date(timeStamp);
    const newDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return newDate;
  }

  return (
    <>
      {displayedOrders.map((order) => {
        const date = dateFromObjectId(order.order_id);
        return (
          <tr className="tableRow" key={order.order_id}>
            <td></td>
            <td>{date}</td>
            <td>{order.shopName}</td>
            <td>{order.orderDetails}</td>
            <td style={{ color: "red" }}>
              <strong>€{order.creditAmount}</strong>
            </td>

            <td>
              <EditOrder
                show={editModalShow}
                selected={selected}
                onHide={() => setEditModalShow(false)}
              />
              <Button
                style={{ marginRight: "10px" }}
                variant="warning"
                onClick={() => {
                  handleClick(order);
                  setEditModalShow(true);
                }}
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </Button>

              <DeleteOrder
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                selected={selected}
                handleDelete={handleDelete}
              />
              <Button
                className="deleteButton"
                variant="danger"
                onClick={() => {
                  handleClick(order);
                  setDeleteModalShow(true);
                }}
              >
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
