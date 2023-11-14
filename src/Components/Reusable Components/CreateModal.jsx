import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function CreateModal(props) {
  if (props.title === "shop" || props.title === "editShop") {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter2">
            {props.title === "shop" ? "Create A New Shop" : "Edit Current Shop"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                required
                name="name"
                type="text"
                placeholder="Insert Shop Name"
                onChange={props.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Properitor Name</Form.Label>
              <Form.Control
                required
                name="properitor"
                type="text"
                placeholder="Insert Properitor Name"
                onChange={props.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                required
                name="contact"
                type="number"
                placeholder="Insert Contact Number"
                onChange={props.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                name="location"
                type="text"
                placeholder="Insert Shop Location"
                onChange={props.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </>
    );
  } else if (props.title === "order" || props.title === "editOrder") {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title === "order"
              ? "Create A New Order"
              : "Edit Current Order"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                as="select"
                name="shop_id"
                onChange={props.handleChange}
              >
                <option value="">Select the name of shop</option>
                {props.title === "order" ? (
                  props.shops.map((shop) => {
                    return (
                      <>
                        <option key={shop._id} value={shop._id}>
                          {shop.name}
                        </option>
                      </>
                    );
                  })
                ) : (
                  <option>{props.selected.shopName}</option>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Order Details</Form.Label>
              <Form.Control
                required
                name="orderDetails"
                as="textarea"
                rows={3}
                placeholder="Insert Order Details"
                onChange={props.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                required
                name="amount"
                type="number"
                placeholder="Insert Amount"
                onChange={props.handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </>
    );
  } else if (props.title === "debitAmount") {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Debit Amount Entry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                as="select"
                name="shopid"
                onChange={props.handleChange}
              >
                <option value="">Select the name of shop</option>
                {props.shops.map((shop) => {
                  return (
                    <option key={shop._id} value={shop._id}>
                      {shop.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Debit Amount</Form.Label>
              <Form.Control
                required
                name="debitAmount"
                type="number"
                rows={3}
                placeholder="Insert Debit Amount"
                onChange={props.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </>
    );
  }
}
