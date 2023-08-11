import {
    Button,
    Table,
    Row,
    Modal,
    Form,
    FormGroup,
    Input,
    Col,
    Label,
  } from "reactstrap";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
  
  const ParentPermission = (props) => {
    const [createParentModal, setCreateParentModal] = useState(false);
    const [editParentModal, setEditParentModal] = useState(false);
    const [parentPermissions, setParentPermissions] = useState([]);
    const [parentToUpdate, setParentToUpdate] = useState(null);
    const [permissionName, setPermissionName] = useState("");
    const [permissionDesc, setPermissionDesc] = useState("");

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


    const toggleCreateParentModal = () => {
      setCreateParentModal(!createParentModal);
    };

    const toggleEditParentModal = () => {
      setEditParentModal(!editParentModal);
    };

    useEffect(() => {
      fetchParentPermissions();
    }, []);

    const fetchParentPermissions = async () => {
      try {
        const response = await axios.get("http://argonbackend.test/api/permissions/parent-permissions");
        setParentPermissions(response.data.parentPermissions);
      } catch (error) {
        console.error("Error fetching parent permissions:", error);
      }
    };

    const handleSaveParentPermission = async () => {
      try {
        const response = await axios.post("http://argonbackend.test/api/permissions/store/parent-permission", {
          name: permissionName,
          description: permissionDesc,
        });
  
        console.log(response.data); // Log the response data
        
        fetchParentPermissions();
        
        showAlert(response.data.message, "success");
  
        // Clear the form and close the modal
        setPermissionName("");
        setPermissionDesc("");
        setCreateParentModal(false);
      } catch (error) {
        console.error("Error saving parent permission:", error.response);
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message, "danger");
        } else {
          showAlert("An error occurred while saving the parent permission.", "danger");
        }
      }
    };

    const updateParentPermission = async () => {
        try {
          const response = await axios.put(`http://argonbackend.test/api/permissions/update-parent/${parentToUpdate}`, {
            name: permissionName,
            description: permissionDesc,
          });
    
          // Handle the success response
          console.log(response.data); // You can handle the response as per your requirement

          // Fetch updated parent permissions
          fetchParentPermissions();

          showAlert(response.data.message, "success");
    
          // Close the modal and clear the input fields
          setParentToUpdate(null);
          setPermissionName("");
          setPermissionDesc("");
          setEditParentModal(false);
    
        } catch (error) {
          console.error("Error updating parent permission:", error);
          if (error.response && error.response.data && error.response.data.message) {
            showAlert(error.response.data.message, "danger");
          } else {
            showAlert("An error occurred while updating the parent permission.", "danger");
          }
        }
    };

    const handleUpdateParent = (parent) => {
      setParentToUpdate(parent.id);
      setPermissionName(parent.name);
      setPermissionDesc(parent.description);
      setEditParentModal(true);
    };

    const deleteParentPermission = async (parentId) => {
      try {
        const response = await axios.delete(`http://argonbackend.test/api/permissions/delete-parent/${parentId}`);

        fetchParentPermissions();

        showAlert(response.data.message, "success");
        
      } catch (error) {
        console.error("Error deleting parent permission:", error);
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message, "danger");
        } else {
          showAlert("An error occurred while deleting the parent permission.", "danger");
        }
      }
    };
    
    return (
      <>
        <div className="text-right m-1 p-1">
        <Button type="button" size="sm" color="primary" onClick={toggleCreateParentModal}>
            Create Parent
        </Button>
        </div>

        {/* Create */}
        <Modal
        className="modal-dialog-centered"
        isOpen={createParentModal}
        toggle={toggleCreateParentModal}
        size={'md'}
    >
        <div className="modal-header">
        <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleCreateParentModal}
        >
            <span aria-hidden={true}>×</span>
        </button>
        </div>
        <div className="modal-body">
        <Form>
            <Row>
            <Col>
            <FormGroup>
                <Label for="roleName" size="md">Parent Permission Name</Label>
                <Input
                    className="form-control-alternative"
                    id="roleName"
                    type="text"
                    value={permissionName}
                    onChange={(e) => setPermissionName(e.target.value)}
                />
            </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col>
                <FormGroup>
                <Label for="roleName" size="md">Parent Permission Description</Label>
                    <Input
                    className="form-control-alternative"
                    id="roleDesc"
                    type="textarea"
                    value={permissionDesc}
                    onChange={(e) => setPermissionDesc(e.target.value)}
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
            onClick={toggleCreateParentModal}
        >
            Close
        </Button>
        <Button id="create" color="primary" type="button" onClick={handleSaveParentPermission}>
            Save changes
        </Button>
        </div>
        </Modal>

        {/* Update */}
        <Modal
        className="modal-dialog-centered"
        isOpen={editParentModal}
        toggle={toggleEditParentModal}
        size={'md'}
    >
        <div className="modal-header">
        <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleEditParentModal}
        >
            <span aria-hidden={true}>×</span>
        </button>
        </div>
        <div className="modal-body">
        <Form>
            <Row>
            <Col>
            <FormGroup>
                <Label for="roleName" size="md">Parent Permission Name</Label>
                <Input
                    className="form-control-alternative"
                    id="roleName"
                    type="text"
                    value={permissionName}
                    onChange={(e) => setPermissionName(e.target.value)}
                />
            </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col>
                <FormGroup>
                <Label for="roleName" size="md">Parent Permission Description</Label>
                    <Input
                    className="form-control-alternative"
                    id="roleDesc"
                    type="textarea"
                    value={permissionDesc}
                    onChange={(e) => setPermissionDesc(e.target.value)}
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
            onClick={toggleEditParentModal}
        >
            Close
        </Button>
        <Button id="create" color="primary" type="button" onClick={updateParentPermission}>
            Save changes
        </Button>
        </div>
        </Modal>

        <Table className="align-items-center table-flush" responsive>
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {parentPermissions.map((permission, index) => (
            <tr key={index}>
                <td>{permission.id}</td>
                <td>{permission.name}</td>
                <td>{permission.description}</td>
                <td>
                <Button type="button" size="sm" color="primary" onClick={() => handleUpdateParent(permission)}>Edit</Button>
                <Button type="button" size="sm" color="danger" onClick={() => deleteParentPermission(permission.id)}>Delete</Button>
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
      </>
    );
  };
  
  export default ParentPermission;
  