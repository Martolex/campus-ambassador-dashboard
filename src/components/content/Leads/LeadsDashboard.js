import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { get } from "../../../utils/requests";
import { LeadsApi } from "../../../utils/EndPoints";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import AddLeadsModal from "./AddLeadsModal";
const LeadsDashboard = (props) => {
  const [leads, setLeads] = useState([]);
  const [addLeadsModalState, setAddLeadsModalState] = useState(false);
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      setLeads(data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    if (!addLeadsModalState) {
      getData(LeadsApi.getLeads);
    }
  }, [addLeadsModalState]);

  return (
    <Container className="mt-4" fluid>
      <AddLeadsModal
        show={addLeadsModalState}
        handleClose={() => setAddLeadsModalState(false)}
      />
      <Row className="mb-2 justify-content-center">
        <Col className="text-right">
          <Button
            onClick={() => setAddLeadsModalState(true)}
            className="mr-2"
            variant="success"
          >
            ADD LEADS
          </Button>
          <Button variant="info">SEND PROMO EMAIL</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <div style={{ border: "1px solid #eee" }}>
            <Table responsive hover>
              <thead className="bg-primary">
                <tr>
                  <th className="text-center">NAME</th>
                  <th className="text-center">EMAIL</th>
                  <th className="text-center">PHONE NO</th>
                  <th className="text-center">COLLEGE</th>
                  <th className="text-center">ACTIONS</th>
                </tr>
              </thead>
              {leads.length > 0 ? (
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="text-center">{lead.name}</td>
                      <td className="text-center">{lead.email}</td>
                      <td className="text-center">{lead.phoneNo}</td>
                      <td className="text-center">{lead.college.name}</td>
                      <td className="text-center">
                        <Button className="mr-2" variant="info">
                          <FaPhone size="22" />
                        </Button>
                        <Button variant="info">
                          <MdEmail size="25" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tr>
                  <td colspan="100%">
                    <h2 className="w-100 text-center display-4">No Leads</h2>
                  </td>
                </tr>
              )}
            </Table>
          </div>
        </Col>
      </Row>
      <Row className="pagination justify-content-center mt-3 p-0">
        <Col md={3} className="p-0 m-0">
          <Row className="p-0 m-0">
            <Col onClick={() => {}} className="button">
              <BsChevronLeft size={20} />
            </Col>
            <Col className="button pageNum">
              <span style={{ fontSize: "1.3em" }}>{1}</span>
            </Col>
            <Col onClick={() => {}} className="button m-0">
              <BsChevronRight size={20} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LeadsDashboard;
