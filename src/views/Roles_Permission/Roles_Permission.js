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
    Alert,
    FormGroup,
    CardBody,
    Label,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "reactstrap";
  import NormHeader from "components/Headers/NormalHeader/NormHeader";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
import CreateRolePermissionModal from "./Modal/CreateRolePermissionModal";
  
  const Roles_Permission = (props) => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [rolespermissions, setRolesPermissions] = useState([]);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertColor, setAlertColor] = useState("");
  
    const showAlert = (message, color) => {
      setAlertMessage(message);
      setAlertColor(color);
      setAlertVisible(true);
  
      // Hide the alert after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    };

    const handlePermissionSelect = (permission) => {
      if (!selectedPermissions.find((p) => p.id === permission.id)) {
        setSelectedPermissions([...selectedPermissions, permission]);
      }
    };
  
    const handlePermissionRemove = (permission) => {
      setSelectedPermissions(selectedPermissions.filter((p) => p.id !== permission.id));
    };

    const handleRoleSelect = (event) => {
      const role = event.target.value;
      setSelectedRole(role);
    };
  
    //Modal
    const [createRolePermissionModal, setCreateRolePermissionModal] = useState(false);

    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://argonbackend.test/api/roles");
        setRoles(response.data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    // Fetch permissions data from the API
    const fetchPermissions = async () => {
      try {
        const response = await axios.get("http://argonbackend.test/api/permissions");
        setPermissions(response.data.permissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

     const fetchRolesPermissions = async () => {
    try {
      const response = await axios.get('http://argonbackend.test/api/roles-permissions');
      setRolesPermissions(response.data.rolePermissions);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };
  
    useEffect(() => {
      fetchRolesPermissions();
      fetchRoles();
      fetchPermissions();
    }, []);
  
    const toggleModal = () => {
      setCreateRolePermissionModal(!createRolePermissionModal);
    };

    const handleSaveChanges = async () => {
      try {
        const response = await axios.post(
          "http://argonbackend.test/api/save-role-permissions",
          {
            roleId: selectedRole,
            permissions: selectedPermissions.map((permission) => permission.id),
          }
        );
        console.log(response.data);

        fetchRolesPermissions();
        
        showAlert(response.data.message, "success");
        
        setSelectedRole("");
        setSelectedPermissions([]);
        setCreateRolePermissionModal(false);
        
      } catch (error) {
        console.error("Error saving role permissions:", error);
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message, "danger");
          setSelectedRole("");
          setSelectedPermissions([]);
          setCreateRolePermissionModal(false);
        } else {
          showAlert("An error occurred while saving the role and permission.", "danger");
        }
      }
    };

    const handleDelete = async (roleId, permissionId) => {
      try {
        const response = await axios.delete(`http://argonbackend.test/api/roles-permissions/${roleId}/${permissionId}`);
        console.log(response.data);
    
        fetchRolesPermissions();
    
        showAlert(response.data.message, "success");
      } catch (error) {
        console.error("Error deleting role permission:", error);
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message, "danger");
        } else {
          showAlert("An error occurred while deleting the role permission.", "danger");
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
                      <h3 className="mb-0">Roles & Permissions</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={toggleModal}
                        size="sm"
                      >
                        Create Roles & Permission
                      </Button>
                    </div>

                    <CreateRolePermissionModal
                        createRolePermissionModal={createRolePermissionModal}
                        roles={roles}
                        permissions={permissions}
                        selectedRole={selectedRole}
                        selectedPermissions={selectedPermissions}
                        handleRoleSelect={handleRoleSelect}
                        handlePermissionSelect={handlePermissionSelect}
                        handlePermissionRemove={handlePermissionRemove}
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
                        <th scope="col">Role</th>
                        <th scope="col">Permission</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rolespermissions.map((rolepermission, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>{rolepermission.role.name}</td>
                          <td>{rolepermission.permission.name}</td>
                          <td>
                            <Button className="btn" size="sm" color="primary">Edit</Button>
                            <Button className="btn" size="sm" color="danger" onClick={() => handleDelete(rolepermission.role.id, rolepermission.permission.id)}>Delete</Button>
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
  
  export default Roles_Permission;
  