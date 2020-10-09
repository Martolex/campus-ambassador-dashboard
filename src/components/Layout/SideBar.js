import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Col, ListGroup, Row } from "react-bootstrap";
const SideBar = ({ items, ...props }) => {
  const location = useLocation();
  return (
    <ListGroup variant="flush" className="bg-dark sidebar-container">
      {items.map((item) => (
        <ListGroup.Item className="sidebar-item">
          <Link className="btn-link" onClick={props.closeMenu} to={item.path}>
            <Row
              className={`item ${
                location.pathname.includes(item.path) && "clicked"
              }`}
            >
              <Col md={2} xs={props.isOpen ? 3 : 12}>
                {item.icon && (
                  <item.icon.component size={item.icon.size || 25} />
                )}
              </Col>

              <Col
                className={`p-0 ${
                  props.isOpen ? "d-xs-flex" : "d-none"
                } pl-md-2 align-items-center d-md-flex`}
                xs={9}
                md={10}
              >
                {item.title}
              </Col>
            </Row>
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SideBar;
