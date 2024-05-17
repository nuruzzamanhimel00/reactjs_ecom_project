import React from "react";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Dashboard = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <div>Orders </div>
                    <div>12</div>
                  </div>
                  <div>
                    <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                  </div>
                </div>
                <Card.Text>24 new since last visit</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <div>Orders </div>
                    <div>12</div>
                  </div>
                  <div>
                    <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                  </div>
                </div>
                <Card.Text>24 new since last visit</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <div>Orders </div>
                    <div>12</div>
                  </div>
                  <div>
                    <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                  </div>
                </div>
                <Card.Text>24 new since last visit</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <div>Orders </div>
                    <div>12</div>
                  </div>
                  <div>
                    <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                  </div>
                </div>
                <Card.Text>24 new since last visit</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
