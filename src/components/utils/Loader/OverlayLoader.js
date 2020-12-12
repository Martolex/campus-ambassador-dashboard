import React from "react";
import "./overlayLoader.scss";
import { Container, Spinner } from "react-bootstrap";
import Overlay from "./overLay";
const overlayLoader = (props) => {
  return (
    <Overlay style={{ position: "fixed", left: 0 }}>
      <Container
        className="loading-container bg-light"
        style={{
          zIndex: 100,
          ...props.style,
          marginTop: "20%",
        }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    </Overlay>
  );
};
export default overlayLoader;
