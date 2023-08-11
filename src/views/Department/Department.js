import {
    Button,
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Col,
    Alert,
    CardBody,
  } from "reactstrap";
  import NormHeader from "components/Headers/NormalHeader/NormHeader";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
// import CreateTeacherModal from "./Modal/CreateTeacherModal";
  
  const Department = (props) => {
    const [designations, setDesignations] = useState([]);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertColor, setAlertColor] = useState("");

    // const [createTeacherModal, setCreateTeacherModal] = useState(false);

    // const toggleModal = () => {
    //     setCreateTeacherModal(!createTeacherModal);
    // };
  
    const showAlert = (message, color) => {
      setAlertMessage(message);
      setAlertColor(color);
      setAlertVisible(true);
  
      // Hide the alert after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    };

    const fetchDesignation = async () => {
        try {
        const response = await axios.get('http://argonbackend.test/api/admin/designations');
        console.log(response.data.designation);
        setDesignations(response.data.designation);
        } catch (error) {
        console.error('Error fetching permissions:', error);
        }
  };
  
    useEffect(() => {
      fetchDesignation();
    }, []);
  
    return (
      <>
        <NormHeader />
        <Container className="mt--7" fluid>
          <Row className="mt-2 w-100">
            <Col className="mb-5 w-100">
              <Alert color="success" isOpen={alertVisible && alertColor === "success"} toggle={() => setAlertVisible(false)}>
                {alertMessage}
              </Alert>
              <Alert color="danger" isOpen={alertVisible && alertColor === "danger"} toggle={() => setAlertVisible(false)}>
                {alertMessage}
              </Alert>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Designations</h3>
                    </div>

                  </Row>
                </CardHeader>
                <CardBody>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>

                      </tr>
                    </thead>
                    <tbody>
                      {designations.map((designation, index) => (
                        <tr key={index}>
                          <td>{designation.id}</td>
                          <td>{designation.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Department;
  