import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { debitDelete } from "../../Assets/API";
import DeleteDebit from "./DeleteDebit";

export default function DisplayDebit({
  debit,
  setDebit,
  displayedDebit,
  showAlert,
  setShowAlert,
  alertTitle,
  setAlertTitle,
}) {
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [shopId, setShopId] = useState({});

  const handleClick = (debit_id, shop_id) => {
    setShopId({
      debit_id: debit_id,
      shop_id: shop_id,
    });
    console.log(shopId);
  };

  async function handleDelete(objectId) {
    const { debit_id, shop_id } = objectId;

    await axios.delete(`${debitDelete}/${shop_id}/${debit_id}`);

    const updatedDebit = debit.filter((item) => item.debit_id !== debit_id);
    console.log(updatedDebit);
    setDebit(updatedDebit);
    setDeleteModalShow(false);
  }

  function dateFromMap(objectId) {
    const timeStamp = parseInt(objectId.substring(0, 8), 16) * 1000;
    const date = new Date(timeStamp);
    const newDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return newDate;
  }

  return (
    <>
      {displayedDebit.map((debit) => {
        const date = dateFromMap(debit.debit_id);
        return (
          <tr key={debit.debit_id}>
            <td></td>
            <td>{date}</td>
            <td>{debit.shopName}</td>
            <td style={{ color: "green" }}>
              <strong>€{debit.amount}</strong>
            </td>

            <td>
              {/* <Button
                style={{ marginRight: "10px" }}
                variant="warning"
                onClick={() => {
                  setModalShow(true);
                  handleShopId();
                }}
              >
                Edit
              </Button> */}
              <DeleteDebit
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                shopid={shopId}
                handleDelete={handleDelete}
              />
              <Button
                variant="danger"
                onClick={() => {
                  handleClick(debit.debit_id, debit.shopID);
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
