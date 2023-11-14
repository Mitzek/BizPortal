import React, { useState } from "react";
import axios from "axios";
import { deleteShop } from "../../Assets/API";
import Button from "react-bootstrap/Button";
import EditShop from "./EditShop";
import DeleteShop from "./DeleteShop";
import Alert from "../Reusable Components/Alert";

export default function DisplayShop({
  shops,
  setShops,
  displayedShops,
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

  async function handleDelete(objectId) {
    if (objectId) {
      const { _id } = objectId;
      try {
        const data = await axios.delete(`${deleteShop}/${_id}`);
        if (data.status === true) {
          setAlertTitle("success");
          setShowAlert(true);
          console.log(data.msg);
        } else {
          setAlertTitle("fail");
          setShowAlert(true);
          console.log(data.msg);
        }

        const updatedShops = shops.filter((item) => item._id !== objectId);
        setShops(updatedShops);
        setDeleteModalShow(false);
      } catch (error) {
        console.log(error);
      }
    }
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
      {displayedShops.map((shop) => {
        const date = dateFromObjectId(shop._id);
        return (
          <tr key={shop._id}>
            <td></td>
            <td>{date}</td>
            <td>{shop.name}</td>
            <td>{shop.properitor}</td>
            <td>{shop.contact}</td>
            <td>{shop.location}</td>
            <td className="buttonsTD">
              <EditShop
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                selected={selected}
              />

              <Button
                style={{ marginRight: "10px" }}
                variant="warning"
                onClick={() => {
                  handleClick(shop);
                  setEditModalShow(true);
                }}
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </Button>
              <DeleteShop
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                selected={selected}
                handleDelete={handleDelete}
              />
              <Button
                variant="danger"
                onClick={() => {
                  handleClick(shop);
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
