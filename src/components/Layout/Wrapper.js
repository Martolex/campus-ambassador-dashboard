import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Container, Col, Row, ListGroup } from "react-bootstrap";
import "../../styles/Layout/Wrapper.scss";
import DataContainer from "./DataContainer";
import SideBar from "./SideBar";

import { MdMenu, MdHome, MdPerson } from "react-icons/md";
const sideBarItems = [
  {
    title: "home",
    path: "/home",
    exact: true,
    icon: { component: MdHome, size: 28 },
    component: () => <h1>Home</h1>,
  },
];
const Wrapper = (props) => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  return (
    <Container
      style={{
        flexDirection: "column",
        height: "100vh",
        transition: "500ms ease all",
      }}
      fluid
    >
      <Row style={{ height: "8vh" }} className="bg-primary header">
        <Col
          className="d-flex align-items-center d-md-none text-center name"
          md={1}
          xs={2}
        >
          <MdMenu size={30} onClick={() => setMenuExpanded(!menuExpanded)} />
        </Col>
        <Col
          className="d-flex p-xs-0 align-items-center text-center name"
          md={3}
          xs={9}
        >
          <h5>STUDENT AMBASSADOR</h5>
        </Col>
      </Row>
      <Row style={{ flex: "auto" }}>
        <Col
          md={2}
          xs={menuExpanded ? 7 : 2}
          style={{
            width: "200px",
            height: "92vh",
            position: menuExpanded ? "absolute" : "relative",
            zIndex: 10,
          }}
          className=" sidebar bg-dark text-light"
        >
          <SideBar
            items={sideBarItems}
            isOpen={menuExpanded}
            closeMenu={() => setMenuExpanded(false)}
          />
        </Col>
        <Col
          style={{
            height: "92vh",
            overflowY: "scroll",
          }}
          xs={{ offset: menuExpanded ? 2 : 0 }}
        >
          <DataContainer items={sideBarItems} />
        </Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
