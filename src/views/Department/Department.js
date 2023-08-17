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
import CreateDepartmentModal from "./Modal/CreateDepartmentModal";
  
  const Department = (props) => {
    const [name, setName] = useState("");
    const [departments, setDepartment] = useState([]);
    const [departmentToUpdate, setDepratmentToUpdate] = useState(null);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertColor, setAlertColor] = useState("");

    const [createDepartmentModal, setCreateDepartmentModal] = useState(false);
    const [editDepartmentModal, setEditDepartmentModal] = useState(false);

    const toggleCreateModal = () => {
      setCreateDepartmentModal(!createDepartmentModal);
    };

    const toggleEditDepartmentModal = () => {
      setEditDepartmentModal(!editDepartmentModal);
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

    const fetchDepartments = async () => {
      try {
      const response = await axios.get('http://argonbackend.test/api/admin/departments');
      setDepartment(response.data.departments);
      } catch (error) {
      console.error('Error fetching permissions:', error);
      }
    };
  
    useEffect(() => {
      fetchDepartments();
    }, []);

    const handleSaveChanges = async (formData) => {
      try {
          // Send formData to your server using an API call
        const response = await axios.post("http://argonbackend.test/api/admin/department/store", formData);
        fetchDepartments();
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

    const updateDepartment = async () => {
      try {
        const response = await axios.put(`http://argonbackend.test/api/admin/department/edit/${departmentToUpdate}`, {
          name: name,
        });
  
        // Handle the success response
        console.log(response.data); // You can handle the response as per your requirement

        fetchDepartments();
  
        // Close the modal and clear the input fields
        setName("");
        setEditDepartmentModal(false);

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
  
    const handleUpdateDepartment = (department) => {
      setDepratmentToUpdate(department.id);
      setName(department.name);
      setEditDepartmentModal(true);
    };

    const handleDeleteDepartment = async (departmentId) => {
      try {
        const response = await axios.delete(`http://argonbackend.test/api/admin/department/delete/${departmentId}`);
        fetchDepartments();
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
                      <h3 className="mb-0">Departments</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={toggleCreateModal}
                        size="sm"
                      >
                        Create Department
                      </Button>
                    </div>
                  </Row>
                    <CreateDepartmentModal
                      createDepartmentModal={createDepartmentModal}
                      handleSaveChanges={handleSaveChanges}
                      toggleCreateModal={toggleCreateModal}
                    />

                    {/* Edit */}
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={editDepartmentModal}
                    toggle={toggleEditDepartmentModal}
                    size={'md'}
                  >
                    <div className="modal-header">
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleEditDepartmentModal}
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
                        onClick={toggleEditDepartmentModal}
                      >
                        Close
                      </Button>
                      <Button id='update' color="primary" type="button" onClick={updateDepartment}>
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
                        <th scope="col" className="d-flex justify-content-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((department, index) => (
                        <tr key={index}>
                          <td>{department.id}</td>
                          <td>{department.name}</td>
                          <td className="d-flex justify-content-center">
                            <Button className="btn" size="sm" color="primary" onClick={() => handleUpdateDepartment(department)}>Edit</Button>
                            <Button className="btn" size="sm" color="danger" onClick={() => handleDeleteDepartment(department.id)}>Delete</Button>
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
  
  export default Department;
  