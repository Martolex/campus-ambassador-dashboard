import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { collegeApi, LeadsApi } from "../../../utils/EndPoints";
import { get, post } from "../../../utils/requests";
import _ from "lodash";
import Select from "react-select/async";
import { connect } from "react-redux";
const AddLeadsModal = (props) => {
  const lead = { name: "", email: "", phoneNo: "" };
  const initialState = {
    college: {
      value: props.ambassadorCollege.id,
      label: props.ambassadorCollege.name,
    },
    leads: [lead],
  };
  const [data, setData] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const loadColleges = useCallback(
    _.debounce((inputValue, callback) => {
      try {
        get(collegeApi, true, { query: inputValue }).then(([options]) => {
          console.log(options);
          callback(
            options.map((item) => {
              return { value: item.id, label: item.name };
            })
          );
        });
      } catch (err) {
        console.log(err);
      }
    }, 300),
    []
  );
  function addNewLead() {
    setData({ ...data, leads: [...data.leads, lead] });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      saveLeads();
    }
    setValidated(true);
  }

  async function saveLeads() {
    const postData = {
      multiple: true,
      collegeId: data.college.value,
      leads: data.leads.map(({ name, email, phoneNo }) => ({
        name,
        email,
        phoneNo,
      })),
    };
    try {
      const [res] = await post(LeadsApi.saveLeads, true, postData);
      if (res.errors?.duplicates?.length > 0) {
        alert(
          `${res.errors.duplicates
            .map((err) => err.email)
            .join()} are duplicate entries`
        );
      } else {
        alert(res.message);
      }
      props.handleClose();
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    if (props.show) {
      setData(initialState);
      setValidated(false);
    }
  }, [props.show, initialState]);
  return (
    <Modal size="lg" centered show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ADD LEADS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Group controlId="college">
                <Form.Label>College</Form.Label>
                <Select
                  placeholder="Select College ..."
                  value={data.college}
                  loadOptions={loadColleges}
                  onChange={(option) => {
                    setData({ ...data, college: option });
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  Select a college
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {data.leads.map((lead, index) => (
            <Row style={{ border: "1px solid #eee" }} className="m-1">
              <Col md={4} xs={12}>
                <Form.Group controlId={`lead-${index + 1}-name`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={lead.name}
                    type="text"
                    required
                    onChange={(event) => {
                      data.leads[index].name = event.target.value;
                      setData({ ...data, leads: [...data.leads] });
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    Name is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group controlId={`lead-${index + 1}-email`}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={lead.email}
                    type="email"
                    required
                    onChange={(event) => {
                      data.leads[index].email = event.target.value;
                      setData({ ...data, leads: [...data.leads] });
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    Enter valid E-Mail
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} xs={12}>
                <Form.Group controlId={`lead-${index + 1}-phoneNo`}>
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control
                    value={lead.phoneNo}
                    required
                    type="tel"
                    minLength="10"
                    maxLength="10"
                    pattern="[7-9]+[0-9]+"
                    onChange={(event) => {
                      data.leads[index].phoneNo = event.target.value;
                      setData({ ...data, leads: [...data.leads] });
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    phone No is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          ))}
          <Row className="mt-2">
            <Col>
              <Button onClick={addNewLead} variant="success">
                ADD MORE
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button variant="warning" block type="submit">
                SAVE LEADS
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose} className="danger">
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  ambassadorCollege: state.user.profile.college,
});
export default connect(mapStateToProps)(AddLeadsModal);
