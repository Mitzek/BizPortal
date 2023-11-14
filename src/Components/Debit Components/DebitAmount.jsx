import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CreateModal from "../Reusable Components/CreateModal";
import { debitEntry } from "../../Assets/API";
import Alert from "../Reusable Components/Alert";

export default function DebitAmount(props) {
  const [amount, setAmount] = useState({
    shopid: "",
    debitAmount: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAmount({ ...amount, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shopid, debitAmount } = amount;

    const { data } = await axios.put(`${debitEntry}/${shopid}`, {
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
      >
        {props.showAlert ? (
          <Alert title={props.alertTitle} />
        ) : (
          <>
            <CreateModal
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              title={"debitAmount"}
              shops={props.shops}
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
