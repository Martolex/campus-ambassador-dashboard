import React, { useState } from "react";

import { Container, Col, Row } from "react-bootstrap";
import "../../styles/Layout/Wrapper.scss";
import DataContainer from "./DataContainer";
import SideBar from "./SideBar";

import { MdMenu } from "react-icons/md";

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
      <Row className="data-container" style={{ flex: "auto" }}>
        <Col
          md={2}
          xs={menuExpanded ? 7 : 2}
          style={{
            position: menuExpanded ? "absolute" : "relative",
          }}
          className={` sidebar bg-dark text-light  ${
            menuExpanded ? "d-xs-flex" : "d-none"
          } d-md-flex`}
        >
          <SideBar closeMenu={() => setMenuExpanded(false)} />
        </Col>
        <Col className="data-div">
          <DataContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
