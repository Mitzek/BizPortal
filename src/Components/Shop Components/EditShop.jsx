import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { editShop } from "../../Assets/API";
import CreateModal from "../Reusable Components/CreateModal";
import Alert from "../Reusable Components/Alert";
export default function EditShop(props) {
  const [user, setUser] = useState({
    name: "",
    properitor: "",
    contact: "",
    location: "",
    date: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shop_id = props.selected._id;

    const { name, properitor, contact, location } = user;
    const { data } = await axios.put(`${editShop}/${shop_id}`, {
      name,
      properitor,
      contact,
      location,
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
    e.target.reset();
    window.location.reload();
  };

  if (!props.show) {
    <></>;
  } else {
    return (
      <>
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
                title={"editShop"}
                selected={props.selected}
              />
              <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </>
    );
  }
}
