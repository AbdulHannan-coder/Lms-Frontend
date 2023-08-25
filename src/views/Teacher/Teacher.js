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
import CreateTeacherModal from "./Modal/CreateTeacherModal";
  
  const Teacher = (props) => {
    const [teachers, setTeachers] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [selectedDesignation, setSelectedDesignation] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);

    const handleDesignationSelect = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setSelectedDesignation(selectedOptions);
    };

    const handleDepartmentSelect = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      setSelectedDepartment(selectedOptions);
    };

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
        setTeachers(response.data.teacher);
      } catch (error) {
      console.error('Error fetching permissions:', error);
      }
    };

  const fetchDesignation = async () => {
    try {
      const response = await axios.get('http://argonbackend.test/api/admin/designations');
      setDesignations(response.data.designation);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
    const response = await axios.get('http://argonbackend.test/api/admin/departments');
    setDepartments(response.data.departments);
    } catch (error) {
    console.error('Error fetching permissions:', error);
    }
  };
  
    useEffect(() => {
      fetchTeacher();
      fetchDesignation();
      fetchDepartments();
    }, []);

    const handleSaveChanges = async (formData) => {
      try {
        console.log(selectedDesignation);
          // Send formData to your server using an API call
          await axios.post("http://argonbackend.test/api/admin/teacher/store", formData);
          fetchTeacher();
          toggleModal();
      } catch (error) {
        console.error("An error occurred while saving teacher information:", error);
      }
    };
    
    const [teacherName, setTeacherName] = useState("");
    const [teacherImg, setTeacherImg] = useState("");
    const [teacherContact, setTeacherContact] = useState("");
    const [teacherDept, setTeacherDept] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherDesignation, setTeacherDesignation] = useState("");
    const [teacherCourses, setTeacherCourses] = useState("");


    const [teacherToUpdate, setTeacherToUpdate] = useState(null);

    const [editTeacherModal, setEditTeacherModal] = useState(false);
    const toggleEditTeacherModal = () => {
      setEditTeacherModal(!editTeacherModal);
    };

    const handleUpdateTeacher = (teacher) => {
      setTeacherToUpdate(teacher.id);
      setTeacherName(teacher.name);
      setTeacherImg(teacher.image);
      teacher.designations.forEach(designation => {
        const designationId = designation.pivot.designation_id;
        setTeacherDesignation(designationId)
        console.log('Designation ID:', designationId);
      });
      setTeacherCourses(teacher.courses)
      setTeacherContact(teacher.contact_no);
      setTeacherEmail(teacher.email);
      setTeacherDept(teacher.department);
      setEditTeacherModal(true);
    };

    const updateTeacher = async () => {
      try {
        const response = await axios.put(`http://argonbackend.test/api/admin/teacher/edit/${teacherToUpdate}`, {
          name: teacherName,
          image: teacherImg,
          contact_no: teacherContact,
          department: teacherDept,
          email: teacherEmail,
          designation: teacherDesignation,
          courses: teacherCourses 
        });
  
        // Handle the success response
        console.log(teacherDesignation); // You can handle the response as per your requirement

        fetchTeacher();
  
        // Close the modal and clear the input fields
        setTeacherToUpdate(null);
        setTeacherName("");
        setTeacherImg("");
        setTeacherEmail("");
        setTeacherContact("");
        setTeacherDept("");
        setEditTeacherModal(false);

        showAlert(response.data.message, "success");
  
      } catch (error) {
        console.error("Error updating teacher:", error);
        // Show error alert or perform any other necessary actions
        if (error.response && error.response.data && error.response.data.message) {
            showAlert(error.response.data.message, "danger");
        } else {
            showAlert("An error occurred while updating the teacher.", "danger");
        }
      }
    };

    const handleDeleteTeacher = async (teacherId) => {
      try {
        const response = await axios.delete(`http://argonbackend.test/api/admin/teacher/delete/${teacherId}`);
        fetchTeacher();
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
                        designations={designations}
                        departments={departments}
                        selectedDepartment={selectedDepartment}
                        selectedDesignation={selectedDesignation}
                        handleDepartmentSelect={handleDepartmentSelect}
                        handleDesignationSelect={handleDesignationSelect}
                        createTeacherModal={createTeacherModal}
                        handleSaveChanges={handleSaveChanges}
                        toggleModal={toggleModal}
                    />

                    {/* Edit */}
                    <Modal
                      className="modal-dialog-centered"
                      isOpen={editTeacherModal}
                      toggle={toggleEditTeacherModal}
                      size={'md'}
                    >
                      <div className="modal-header">
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={toggleEditTeacherModal}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <Form>
                          <Row>
                            <Col>
                            <FormGroup>
                                <Label for="teacherName" size="md">Name</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="teacherName"
                                  type="text"
                                  value={teacherName}
                                  onChange={(e) => setTeacherName(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label for="teacherImg" size="md">Image</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="teacherImg"
                                  type="text"
                                  value={teacherImg}
                                  onChange={(e) => setTeacherImg(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                            <FormGroup>
                                <Label for="teacherDesignation" size="md">Designation</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="teacherDesignation"
                                  name="teacherDesignation"
                                  type="select"
                                  value={teacherDesignation}
                                  onChange={(e) => setTeacherDesignation(e.target.value)}
                                >
                                  <option value="">Select Designation:</option>
                                  {designations.map((designation, index) => (
                                    <option key={index} value={designation.id}>
                                      {designation.name}
                                    </option>
                                  ))}
                                </Input>
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label for="teacherDept" size="md">Department</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="teacherDept"
                                  type="text"
                                  value={teacherDept}
                                  onChange={(e) => setTeacherDept(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                            <FormGroup>
                                <Label for="teacherContact" size="md">Contact No</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="teacherContact"
                                  type="text"
                                  value={teacherContact}
                                  onChange={(e) => setTeacherContact(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label for="teacherEmail" size="md">Email</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="teacherEmail"
                                  type="text"
                                  value={teacherEmail}
                                  onChange={(e) => setTeacherEmail(e.target.value)}
                                />
                            </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                            <FormGroup>
                                <Label for="teacherCourses" size="md">Courses</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="teacherCourses"
                                  type="text"
                                  value={teacherCourses}
                                  onChange={(e) => setTeacherCourses(e.target.value)}
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
                          onClick={toggleEditTeacherModal}
                        >
                          Close
                        </Button>
                        <Button id='update' color="primary" type="button" onClick={updateTeacher}>
                          Save changes
                        </Button>
                      </div>
                    </Modal>

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
                          <td>{teacher.id}</td>
                          <td>{teacher.name}</td>
                          <td>
                            {teacher.designations.map((designation) => (
                              <div key={designation.id}>{designation.name}</div>
                            ))}
                          </td>
                          <td>
                            {teacher.departments.map((department) => (
                              <div key={department.id}>{department.name}</div>
                            ))}
                          </td>
                          {/* <td>{teacher.department}</td> */}
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
                            <Button className="btn" size="sm" color="primary" onClick={() => handleUpdateTeacher(teacher)}>Edit</Button>
                            <Button className="btn" size="sm" color="danger"  onClick={() => handleDeleteTeacher(teacher.id)}>
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
  