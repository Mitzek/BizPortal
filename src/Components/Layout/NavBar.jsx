import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./Sidebar";

export default function NavBar({ sideBarDisabled, handleSideBarDisplay }) {
  return (
    <div className="navBarContainer">
      <div className="navBar">
        <span className="navleftSpan">
          <h2>Biz Portal</h2>

          <i
            className={sideBarDisabled ? "fa fa-bars" : "fa fa-times "}
            aria-hidden="true"
            onClick={handleSideBarDisplay}
          ></i>
        </span>
        <span className="navRightSpan">
          <span className="businessTitle">Advance Enterprises</span>
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <i className="fa fa-bell" aria-hidden="true"></i>

          <i className="fa fa-user-circle-o" aria-hidden="true"></i>
        </span>
      </div>
      <div
        className={`sideBar ${
          sideBarDisabled ? "closeSideBar " : "openSideBar"
        }`}
      >
        <Sidebar handleSideBarDisplay={handleSideBarDisplay} />
      </div>
    </div>
  );
}
