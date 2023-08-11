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
import CreateTeacherModal from "./Modal/CreateTeacherModal";
  
  const Teacher = (props) => {
    const [teachers, setTeachers] = useState([]);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertColor, setAlertColor] = useState("");

    const [createTeacherModal, setCreateTeacherModal] = useState(false);

    const toggleModal = () => {
        setCreateTeacherModal(!createTeacherModal);
    };
  
    const showAlert = (message, color) => {
      setAlertMessage(message);
      setAlertColor(color);
      setAlertVisible(true);
  
      // Hide the alert after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    };

    const fetchTeacher = async () => {
        try {
        const response = await axios.get('http://argonbackend.test/api/admin/teachers');
        console.log(response.data.teacher);
        setTeachers(response.data.teacher);
        } catch (error) {
        console.error('Error fetching permissions:', error);
        }
  };
  
    useEffect(() => {
      fetchTeacher();
    }, []);

    const handleSaveChanges = async (formData) => {
        try {
            // Send formData to your server using an API call
            await axios.post("http://argonbackend.test/api/admin/teacher/store", formData);
            fetchTeacher();
        } catch (error) {
          console.error("An error occurred while saving teacher information:", error);
        }
      };
  
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
                      <h3 className="mb-0">Teachers</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={toggleModal}
                        size="sm"
                      >
                        Create Teacher
                      </Button>
                    </div>

                    <CreateTeacherModal
                        createTeacherModal={createTeacherModal}
                        handleSaveChanges={handleSaveChanges}
                        toggleModal={toggleModal}
                    />

                  </Row>
                </CardHeader>
                <CardBody>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Department</th>
                        <th scope="col">Courses</th>
                        <th scope="col">Contact No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Image</th>
                        <th scope='col'>Action</th>

                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{teacher.name}</td>
                          <td>{teacher.designation}</td>
                          <td>{teacher.department}</td>
                          <td>
                                {JSON.parse(teacher.courses).map((course, index) => (
                                    <span key={index}>
                                    {index > 0 && ', '}
                                    <span className="course">{course}</span>
                                    </span>
                                ))}
                            </td>

                          <td>{teacher.contact_no}</td>
                          <td>{teacher.email}</td>
                          <td>{teacher.image}</td>

                          <td>
                            <Button className="btn" size="sm" color="primary">Edit</Button>
                            <Button className="btn" size="sm" color="danger" 
                            // onClick={() => handleDelete(rolepermission.role.id, rolepermission.permission.id)}
                            >
                                Delete
                            </Button>
                          </td>
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
  
  export default Teacher;
  