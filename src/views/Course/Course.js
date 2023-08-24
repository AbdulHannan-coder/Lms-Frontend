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
    Modal,
    Form,
    FormGroup,
    Label,
    Input
  } from "reactstrap";
  import NormHeader from "components/Headers/NormalHeader/NormHeader";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
import CreateCourseModal from "./Modal/CreateCourseModal";
  
  const Course = (props) => {
    const [name, setName] = useState("");
    const [courses, setCourse] = useState([]);
    const [courseToUpdate, setCourseToUpdate] = useState(null);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertColor, setAlertColor] = useState("");

    const [createCourseModal, setCreateCourseModal] = useState(false);
    const [editCourseModal, setEditCourseModal] = useState(false);

    const toggleCreateModal = () => {
      setCreateCourseModal(!createCourseModal);
    };

    const toggleEditCourseModal = () => {
      setEditCourseModal(!editCourseModal);
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

    const fetchCourses = async () => {
      try {
      const response = await axios.get('http://argonbackend.test/api/admin/courses');
      setCourse(response.data.courses);
      } catch (error) {
      console.error('Error fetching permissions:', error);
      }
    };
  
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSaveChanges = async (formData) => {
      try {
          // Send formData to your server using an API call
        const response = await axios.post("http://argonbackend.test/api/admin/course/store", formData);
        fetchCourses();
        toggleCreateModal();
        showAlert(response.data.message, "success");
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message, "danger");
        } 
        else 
        {
          showAlert("An error occurred while saving the department.", "danger");
        }
      }
    };

    const updateCourse = async () => {
      try {
        const response = await axios.put(`http://argonbackend.test/api/admin/course/edit/${courseToUpdate}`, {
          name: name,
        });
  
        // Handle the success response
        console.log(response.data); // You can handle the response as per your requirement

        fetchCourses();
  
        // Close the modal and clear the input fields
        setName("");
        setEditCourseModal(false);

        showAlert(response.data.message, "success");
  
      } catch (error) {
        console.error("Error updating role:", error);
        // Show error alert or perform any other necessary actions
        if (error.response && error.response.data && error.response.data.message) {
            showAlert(error.response.data.message, "danger");
        } else {
            showAlert("An error occurred while saving the role.", "danger");
        }
      }
    };
  
    const handleEditCourse = (course) => {
      setCourseToUpdate(course.id);
      setName(course.title);
      setEditCourseModal(true);
    };

    const handleDeleteCourse = async (courseId) => {
      try {
        const response = await axios.delete(`http://argonbackend.test/api/admin/course/delete/${courseId}`);
        fetchCourses();
        showAlert(response.data.message, "success");
        // Refresh the roles list or perform any other necessary actions
      } catch (error) {
        console.error("Error deleting role:", error);
        // Show error alert or perform any other necessary actions
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message, "danger");
        } else {
          showAlert("An error occurred while saving the role.", "danger");
        }
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
                      <h3 className="mb-0">Courses</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={toggleCreateModal}
                        size="sm"
                      >
                        Create Course
                      </Button>
                    </div>
                  </Row>
                    <CreateCourseModal
                      createCourseModal={createCourseModal}
                      handleSaveChanges={handleSaveChanges}
                      toggleCreateModal={toggleCreateModal}
                    />

                    {/* Edit */}
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={editCourseModal}
                    toggle={toggleEditCourseModal}
                    size={'md'}
                  >
                    <div className="modal-header">
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleEditCourseModal}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <Form>
                        <Row>
                          <Col>
                          <FormGroup>
                              <Label for="name" size="md">Name</Label>
                              <Input
                                className="form-control-alternative"
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                          </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                    <div className="modal-footer">
                      <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleEditCourseModal}
                      >
                        Close
                      </Button>
                      <Button id='update' color="primary" type="button" onClick={updateCourse}>
                        Save changes
                      </Button>
                    </div>
                  </Modal>
                </CardHeader>
                <CardBody>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Department</th>
                        <th scope="col">Credit Hours</th>
                        <th scope="col" className="d-flex justify-content-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={index}>
                          <td>{course.id}</td>
                          <td>{course.title}</td>
                          <td>{course.code}</td>
                          <td>{course.department}</td>
                          <td>{course.credit_hours}</td>
                          <td className="d-flex justify-content-center">
                            <Button className="btn" size="sm" color="primary" onClick={() => handleEditCourse(course)}>Edit</Button>
                            <Button className="btn" size="sm" color="danger" onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
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
  
  export default Course;
  