import React from "react";
import Modal from "react-bootstrap/Modal";

import DeleteModal from "../Reusable Components/DeleteModal";

export default function DeleteDebit(props) {
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
          shopid={props.shopid}
          onHide={props.onHide}
          title="deleteDebit"
        />
      </Modal>
    );
  }
}
