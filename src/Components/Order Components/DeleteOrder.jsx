import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { deleteShop } from "../../Assets/API";

import DeleteModal from "../Reusable Components/DeleteModal";

export default function DeleteOrder(props) {
  if (!props.show) {
    <></>;
  } else {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <DeleteModal
          handleDelete={props.handleDelete}
          selected={props.selected}
          onHide={props.onHide}
          title="deleteOrder"
        />
      </Modal>
    );
  }
}
