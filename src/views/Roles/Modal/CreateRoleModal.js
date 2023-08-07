import React, { useState } from "react";
import {
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const CreateRoleModal = ({ isOpen, toggleModal, handleSaveRole }) => {
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");

  const handleSaveClick = () => {
    // Pass the role data to the parent component
    handleSaveRole(roleName, roleDesc);
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isOpen}
      toggle={toggleModal}
      size="md"
    >
      <div className="modal-header">
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={toggleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <FormGroup>
            <Label for="roleName" size="md">
              Role Name
            </Label>
            <Input
              className="form-control-alternative"
              id="roleName"
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="roleDesc" size="md">
              Role Description
            </Label>
            <Input
              className="form-control-alternative"
              id="roleDesc"
              type="textarea"
              value={roleDesc}
              onChange={(e) => setRoleDesc(e.target.value)}
            />
          </FormGroup>
        </Form>
      </div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={toggleModal}
        >
          Close
        </Button>
        <Button color="primary" type="button" onClick={handleSaveClick}>
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default CreateRoleModal;
