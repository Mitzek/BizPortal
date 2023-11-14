import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { addOrder } from "../../Assets/API";
import CreateModal from "../Reusable Components/CreateModal";
import Alert from "../Reusable Components/Alert";

function AddOrder(props) {
  const [order, setOrder] = useState({
    shop_id: "",
    orderDetails: "",
    amount: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shop_id, orderDetails, amount } = order;

    const { data } = await axios.post(`${addOrder}/${shop_id}`, {
      orderDetails,
      amount,
    });
    if (data.status === true) {
      props.setAlertTitle("success");
      props.setShowAlert(true);
      console.log(data.msg);
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
              title={"order"}
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

export default AddOrder;
