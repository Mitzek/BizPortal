import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { createShop } from "../../Assets/API";
import CreateModal from "../Reusable Components/CreateModal";
import Alert from "../Reusable Components/Alert";

function AddShop(props) {
  const [shop, setShop] = useState({
    name: "",
    properitor: "",
    contact: "",
    location: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setShop({ ...shop, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, properitor, contact, location, debitAmount } = shop;
    const { data } = await axios.post(createShop, {
      name,
      properitor,
      contact,
      location,
      debitAmount,
    });
    if (data.status === true) {
      e.target.reset();
      props.setAlertTitle("success");
      props.setShowAlert(true);
    } else {
      props.setAlertTitle("fail");
      props.setShowAlert(true);
      console.log(data.msg);
    }
  };

  if (!props.show) {
    <></>;
  } else {
    return (
      <Modal
        {...props}
        size={props.showAlert ? "sm" : "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName="modal-width"
      >
        {props.showAlert ? (
          <Alert title={props.alertTitle} />
        ) : (
          <>
            <CreateModal
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              title={"shop"}
            />

            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    );
  }
}

export default AddShop;
