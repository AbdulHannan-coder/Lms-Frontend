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
  
  const ChildPermission = (props) => {
    const [createChildModal, setCreateChildModal] = useState(false);
    const [editChildModal, setEditChildModal] = useState(false);
    const [parentPermissions, setParentPermissions] = useState([]);
    const [childToUpdate, setChildToUpdate] = useState(null);
    const [childrenPermissions, setChildrenPermissions] = useState([]);
    const [childName, setChildName] = useState("");
    const [childDesc, setChildDesc] = useState("");
    const [parentId, setParentId] = useState("");

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


    const toggleCreateChildModal = () => {
      setCreateChildModal(!createChildModal);
    };

    const toggleEditChildModal = async () => {
        setEditChildModal(!editChildModal);
      };

    useEffect(() => {
        fetchParentPermissions();
        fetchChildrenPermissions();
    }, []);

    const fetchParentPermissions = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/permissions/parent-permissions");
          setParentPermissions(response.data.parentPermissions);
        } catch (error) {
          console.error("Error fetching parent permissions:", error);
        }
      };

    const fetchChildrenPermissions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/permissions/children-permissions");
        setChildrenPermissions(response.data.childrenPermissions);
      } catch (error) {
        console.error("Error fetching children permissions:", error);
      }
    };

    const handleSaveChildPermission = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/permissions/store/child-permission", {
          name: childName,
          description: childDesc,
          parent_id: parentId,
        });
  
        // Handle the success response
        console.log(response.data); // You can handle the response as per your requirement

        fetchChildrenPermissions();

        showAlert(response.data.message, "success");
  
        // Close the modal
        setChildName("");
        setChildDesc("");
        setParentId("");
        setCreateChildModal(false);
      } catch (error) {
        console.error("Error creating child permission:", error);
        if (error.response && error.response.data && error.response.data.message) {
          showAlert(error.response.data.message, "danger");
        } else {
          showAlert("An error occurred while saving the child permission:.", "danger");
        }
      }
    };

    const updateChildPermission = async () => {
        try {
          const response = await axios.put(`http://127.0.0.1:8000/api/permissions/update-child/${childToUpdate}`, {
            name: childName,
            description: childDesc,
            parent_id: parentId
          });
    
          // Handle the success response
          console.log(response.data); // You can handle the response as per your requirement

          fetchChildrenPermissions();

          showAlert(response.data.message, "success");
    
          // Close the modal and clear the input fields
          setChildToUpdate(null);
          setChildName("");
          setChildDesc("");
          setEditChildModal(false);
    
        } catch (error) {
          console.error("Error updating child permission:", error);
          if (error.response && error.response.data && error.response.data.message) {
            showAlert(error.response.data.message, "danger");
          } else {
            showAlert("An error occurred while updating the child permission:.", "danger");
          }
        }
    };

    const handleUpdateChil = async (child) => {
        setChildToUpdate(child.id);
        setChildName(child.name);
        setChildDesc(child.description);
        setParentId(child.parent_id)
        setEditChildModal(true);
    };

    const deleteChilPermission = async (childId) => {
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/permissions/delete-parent/${childId}`);
  
          fetchChildrenPermissions();

          showAlert(response.data.message, "success");
        } catch (error) {
          console.error("Error deleting child permission:", error);
          if (error.response && error.response.data && error.response.data.message) {
            showAlert(error.response.data.message, "danger");
          } else {
            showAlert("An error occurred while deleting the child permission:.", "danger");
          }
        }
      };
    
    return (
      <>
        <div className="text-right m-1 p-1">
        <Button type="button" size="sm" color="primary" onClick={toggleCreateChildModal}>
            Create Child
        </Button>
        </div>

        {/* Create */}
        <Modal
        className="modal-dialog-centered"
        isOpen={createChildModal}
        toggle={toggleCreateChildModal}
        size={'md'}
    >
        <div className="modal-header">
        <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleCreateChildModal}
        >
            <span aria-hidden={true}>×</span>
        </button>
        </div>
        <div className="modal-body">
        <Form>
        <Row>
        <Col>
            <FormGroup>
            <Label for="childName" size="md">Child Permission Name</Label>
            <Input
                className="form-control-alternative"
                id="childName"
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
            />
            </FormGroup>
        </Col>
        </Row>
        <Row>
        <Col>
            <FormGroup>
            <Label for="childDesc" size="md">Child Permission Description</Label>
            <Input
                className="form-control-alternative"
                id="childDesc"
                type="textarea"
                value={childDesc}
                onChange={(e) => setChildDesc(e.target.value)}
            />
            </FormGroup>
        </Col>
        </Row>
        <Row>
        <Col>
            <FormGroup>
            <Label for="parentId" size="md">Parent Permission</Label>
            <Input
                className="form-control-alternative"
                id="parentId"
                type="select"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
            >
                <option value="">Select Parent Permission</option>
                {parentPermissions.map((permission) => (
                <option key={permission.id} value={permission.id}>
                    {permission.name}
                </option>
                ))}
            </Input>
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
            onClick={toggleCreateChildModal}
        >
            Close
        </Button>
        <Button id="create" color="primary" type="button" onClick={handleSaveChildPermission}>
            Save changes
        </Button>
        </div>
        </Modal>

        {/* Update */}
        <Modal
        className="modal-dialog-centered"
        isOpen={editChildModal}
        toggle={toggleEditChildModal}
        size={'md'}
    >
        <div className="modal-header">
        <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleEditChildModal}
        >
            <span aria-hidden={true}>×</span>
        </button>
        </div>
        <div className="modal-body">
        <Form>
        <Row>
        <Col>
            <FormGroup>
            <Label for="childName" size="md">Child Permission Name</Label>
            <Input
                className="form-control-alternative"
                id="childName"
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
            />
            </FormGroup>
        </Col>
        </Row>
        <Row>
        <Col>
            <FormGroup>
            <Label for="childDesc" size="md">Child Permission Description</Label>
            <Input
                className="form-control-alternative"
                id="childDesc"
                type="textarea"
                value={childDesc}
                onChange={(e) => setChildDesc(e.target.value)}
            />
            </FormGroup>
        </Col>
        </Row>
        <Row>
        <Col>
            <FormGroup>
            <Label for="parentId" size="md">Parent Permission</Label>
            <Input
                className="form-control-alternative"
                id="parentId"
                type="select"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
            >
                <option value="">Select Parent Permission</option>
                {parentPermissions.map((permission) => (
                <option key={permission.id} value={permission.id}>
                    {permission.name}
                </option>
                ))}
            </Input>
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
            onClick={toggleEditChildModal}
        >
            Close
        </Button>
        <Button id="update" color="primary" type="button" onClick={updateChildPermission}>
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
            <th scope="col">Parent Id</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {childrenPermissions.map((child, index) => (
            <tr key={index}>
                <td>{child.id}</td>
                <td>{child.name}</td>
                <td>{child.description}</td>
                <td>{child.parent_id}</td>
                <td>
                <Button type="button" size="sm" color="primary" onClick={() => handleUpdateChil(child)}>Edit</Button>
                <Button type="button" size="sm" color="danger" onClick={() => deleteChilPermission(child.id)}>Delete</Button>
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
      </>
    );
  };
  
  export default ChildPermission;
  