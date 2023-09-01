/* eslint-disable react-hooks/exhaustive-deps */
import {
    Button,
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Col,
    Input,
    Modal,
    Form,
    FormGroup,
    Label,
    Alert,
  } from "reactstrap";
  import NormHeader from "components/Headers/NormalHeader/NormHeader";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
  import CreateRoleModal from "../Roles/Modal/CreateRoleModal";
  import { useAuth } from "context/AuthContext ";
  
  const Roles = (props) => {
    const {setToken } = useAuth(); //yeh line
    const [roles, setRoles] = useState([]);
    const [createRoleModal, setCreateRoleModal] = useState(false);
    const [editRoleModal, setEditRoleModal] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [roleDesc, setRoleDesc] = useState("");
      const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [roleToUpdate, setRoleToUpdate] = useState(null);
    
    const showAlert = (message, color) => {
      setAlertMessage(message);
      setAlertColor(color);
      setAlertVisible(true);
      
      // Hide the alert after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    };
    
     //yeh line
    useEffect(()=>{
      setToken(localStorage.getItem('token'))
    }, [])
    
    const toggleCreateRoleModal = () => {
      setCreateRoleModal(!createRoleModal);
    };
  
    const toggleEditRoleModal = () => {
      setEditRoleModal(!editRoleModal);
    };
  
    useEffect(() => {
      // Fetch roles data from the API
      fetchRoles();
    }, []);
  
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://argonbackend.test/api/roles");
        setRoles(response.data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
  
    const handleSaveRole = async (roleName, roleDesc) => {
      try {
        const response = await axios.post("http://argonbackend.test/api/roles/store", {
          name: roleName,
          description: roleDesc,
        });
  
        console.log(response.data); // Log the response data
        
        // Fetch the updated list of roles
        fetchRoles();
        
        showAlert(response.data.message, "success");
  
        // Clear the form and close the modal
        setRoleName("");
        setRoleDesc("");
        setCreateRoleModal(false);
      } catch (error) {
        console.error("Error saving role:", error.response);
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message, "danger");
        } else {
          showAlert("An error occurred while saving the role.", "danger");
        }
      }
    };
    
    const updateRole = async () => {
      try {
        const response = await axios.put(`http://argonbackend.test/api/role/${roleToUpdate}`, {
          name: roleName,
          description: roleDesc,
        });
  
        // Handle the success response
        console.log(response.data); // You can handle the response as per your requirement

        fetchRoles();
  
        // Close the modal and clear the input fields
        setRoleToUpdate(null);
        setRoleName("");
        setRoleDesc("");
        setEditRoleModal(false);

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
  
    const handleUpdateRole = (role) => {
      setRoleToUpdate(role.id);
      setRoleName(role.name);
      setRoleDesc(role.description);
      setEditRoleModal(true);
    };
  
    const handleDeleteRole = async (roleId) => {
    try {
      const response = await axios.delete(`http://argonbackend.test/api/role/${roleId}`);
      fetchRoles();
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
                <Row className="align-items-center">
                  {/* Create */}
                  <CreateRoleModal
                        isOpen={createRoleModal}
                        toggleModal={toggleCreateRoleModal}
                        handleSaveRole={handleSaveRole}
                    />
  
                  {/* Edit */}
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={editRoleModal}
                    toggle={toggleEditRoleModal}
                    size={'md'}
                  >
                    <div className="modal-header">
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggleEditRoleModal}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <Form>
                        <Row>
                          <Col>
                          <FormGroup>
                              <Label for="roleName" size="md">Role Name</Label>
                              <Input
                                className="form-control-alternative"
                                id="roleName"
                                type="text"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                              />
                          </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <Label for="roleName" size="md">Role Description</Label>
                                <Input
                                  className="form-control-alternative"
                                  id="roleDesc"
                                  type="textarea"
                                  value={roleDesc}
                                  onChange={(e) => setRoleDesc(e.target.value)}
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
                        onClick={toggleEditRoleModal}
                      >
                        Close
                      </Button>
                      <Button id='update' color="primary" type="button" onClick={updateRole}>
                        Save changes
                      </Button>
                    </div>
                  </Modal>
                </Row>
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Roles</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        size="sm"
                        onClick={toggleCreateRoleModal}
                      >
                        Create Roles
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center" scope="col">Id</th>
                      <th className="text-center" scope="col">Name</th>
                      <th className="text-center" scope="col">Description</th>
                      <th className="text-center" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, index) => (
                      <tr key={index}>
                        <td scope="row">{role.id}</td>
                        <td className="text-center">{role.name}</td>
                        <td className="text-center">{role.description}</td>
                        <td className="text-center">
                          <Button className="btn" size="sm" color="primary" onClick={() => handleUpdateRole(role)}>Edit</Button>
                          <Button className="btn" size="sm" color="danger" onClick={() => handleDeleteRole(role.id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Roles;
  