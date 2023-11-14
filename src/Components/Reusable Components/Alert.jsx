import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

export default function Alert(props) {
  if (props.title === "success" || props.title === "fail") {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  if (props.title === "success" || props.title === "fail") {
    return (
      <>
        <Modal.Body className="alertModal">
          <Form>
            <Form.Group>
              <Form.Label>
                {props.title === "success" ? (
                  <div className="alertSuccessDiv">
                    <i
                      className="alertIcon fa fa-thumbs-up"
                      aria-hidden="true"
                    ></i>
                    <h4>Success!</h4>
                  </div>
                ) : (
                  <div className="alertFailDiv">
                    <i
                      className="alertIcon fa fa-thumbs-down"
                      aria-hidden="true"
                    ></i>
                    <h4>Failed!</h4>
                  </div>
                )}
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </>
    );
  }
}
