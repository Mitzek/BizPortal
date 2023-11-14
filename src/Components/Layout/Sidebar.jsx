import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../style.css";
export default function Sidebar({ handleSideBarDisplay }) {
  const location = useLocation();
  const { pathname } = location;

  const handleColor = (id) => {
    return pathname.includes(id);
  };

  return (
    <div className="sidebar">
      <Stack className="sidebarStack" gap={0}>
        <Link to="/dashboard" className="sidebarOptLink">
          <div
            className={`p-2 sidebarOptions ${
              handleColor("dashboard") || pathname === "/" ? "highlight" : ""
            } `}
            onClick={handleSideBarDisplay}
          >
            <i className="fa fa-desktop" aria-hidden="true"></i>
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to="/shops" className="sidebarOptLink">
          <div
            className={`p-2 sidebarOptions ${
              handleColor("shops") ? "highlight" : ""
            } `}
            onClick={handleSideBarDisplay}
          >
            <i className="fa fa-building-o" aria-hidden="true"></i>
            <p>Shops</p>
          </div>
        </Link>
        <Link to="/orders" className="sidebarOptLink">
          <div
            className={`p-2 sidebarOptions ${
              handleColor("/orders") ? "highlight" : ""
            } `}
            onClick={handleSideBarDisplay}
          >
            <i className="fa fa-list-alt" aria-hidden="true"></i>
            <p>Orders</p>
          </div>
        </Link>

        <Link to="/balancesheet" className="sidebarOptLink">
          <div
            className={`p-2 sidebarOptions ${
              handleColor("/balancesheet") ? "highlight" : ""
            } `}
            onClick={handleSideBarDisplay}
          >
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <p>Balance Sheet</p>
          </div>
        </Link>

        <Link to="/debitHistory" className="sidebarOptLink">
          <div
            className={`p-2 sidebarOptions ${
              handleColor("/debitHistory") ? "highlight" : ""
            } `}
            onClick={handleSideBarDisplay}
          >
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <p>Debit Entry</p>
          </div>
        </Link>

        <a
          href="https://wwww.reyhan-ali.web.app/"
          className="p-2 portfolioDiv sidebarOptLink iconClass"
        >
          <p>Portfolio Project By: Rehan Ali</p>
        </a>
      </Stack>
    </div>
  );
}
