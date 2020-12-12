import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { get } from "../../../utils/requests";
import { statsApi } from "../../../utils/EndPoints";
import StatCard from "./StatCard";
import Line from "../../utils/Charts/Line";
import { connect } from "react-redux";
import { MdContentCopy } from "react-icons/md";
import "../../../styles/content/Home/StatsDashboard.scss";
const StatsDashboard = (props) => {
  const [stats, setStats] = useState(undefined);
  const [leadsChartData, setLeadsChartData] = useState([]);
  const [earningChartData, setEarningChartData] = useState([]);
  async function getData(api, params) {
    console.log(api);
    try {
      const [data] = await get(api, true, params);
      console.log(data);
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    getData(statsApi);
  }, []);

  return stats ? (
    <Container style={{ height: "93%" }} className="mt-4" fluid>
      <Row>
        <Col>
          <h2>Hello, {props.user.name}!</h2>
        </Col>
        {props.user.referralCode && (
          <Col className="align-items-center" md={4}>
            <Row className="align-items-center">
              <Col xs="auto" md="auto">
                REFFERAL CODE:
              </Col>
              <Col xs="auto" md="auto" className="ref-code">
                {props.user.referralCode}
                <MdContentCopy size={22} />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <Row>
        <Col className="my-auto" md={{ span: 5, order: 1 }} xs={{ order: 2 }}>
          <Row className="my-3">
            <Col>
              <h4 className="text-center">Earnings</h4>
              <Line
                className="mb-2"
                labels={stats.chartData.earning.map((item) => item.label)}
                data={stats.chartData.earning.map((item) => item.earning || 0)}
                chartName="Earnings"
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <h4 className="text-center">Leads Added</h4>
              <Line
                className="mb-2"
                labels={stats.chartData.leads.map((item) => item.label)}
                data={stats.chartData.leads.map((item) => item.count || 0)}
                chartName="Leads Added"
              />
            </Col>
          </Row>
        </Col>
        <Col className="my-auto" md={{ order: 2, span: 7 }}>
          <Container fluid>
            <Row>
              <Col>
                <StatCard
                  title="total sales"
                  value={`₹${stats.stats.totalSales || 0}`}
                />
              </Col>
              <Col>
                <StatCard
                  title="Total Earning"
                  value={`₹${stats.stats.totalEarning || 0}`}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <StatCard
                  title="sale this month"
                  value={`₹${stats.stats.oneMonthSales || 0}`}
                />
              </Col>
              <Col>
                <StatCard
                  title="earning this month"
                  value={`₹${stats.stats.oneMonthEarning || 0}`}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <StatCard
                  title="total Books Sold"
                  value={stats.stats.booksSold || 0}
                />
              </Col>
              <Col>
                <StatCard title="total leads" value={stats.stats.leads || 0} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  ) : null;
};

const mapStateToProps = ({ user: { profile } }) => ({
  user: { name: profile.name, referralCode: profile.referralCode },
});

export default connect(mapStateToProps)(StatsDashboard);
