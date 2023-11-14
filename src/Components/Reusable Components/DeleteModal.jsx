import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

export default function DeleteModal(props) {
  if (props.title === "deleteShop" || props.title === "deleteOrder") {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title === "deleteShop" ? "Delete Shop" : "Delete Order"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                {props.title === "deleteShop"
                  ? "Are you sure you want to delete this shop?"
                  : "Are you sure you want to delete this order"}
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3">
              <Stack gap={3}>
                <Button
                  variant="danger"
                  onClick={() => {
                    props.handleDelete(props.selected);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={props.onHide}
                >
                  Cancel
                </Button>
              </Stack>
            </Form.Group>
          </Form>
        </Modal.Body>
      </>
    );
  }

  if (props.title === "deleteDebit") {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Debit Entry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                Are you sure you want to delete this debit Entry?
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3">
              <Stack gap={3}>
                <Button
                  variant="danger"
                  onClick={() => {
                    props.handleDelete(props.shopid);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  onClick={props.onHide}
                >
                  Cancel
                </Button>
              </Stack>
            </Form.Group>
          </Form>
        </Modal.Body>
      </>
    );
  }
}
