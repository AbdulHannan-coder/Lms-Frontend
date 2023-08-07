import React from "react";
import { Button, Form, Input, Modal, Row, Col, FormGroup, Label } from "reactstrap";

const CreateRolePermissionModal = (props) => {
  const {
    roles,
    permissions,
    selectedRole,
    selectedPermissions,
    handleRoleSelect,
    handlePermissionSelect,
    handlePermissionRemove,
    handleSaveChanges,
    toggleModal,
  } = props;

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={props.createRolePermissionModal}
      toggle={props.toggleModal}
      size={"md"}
    >
      <div className="modal-header">
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={props.toggleModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <Row>
            <Col>
              <Label for="roleId" size="md">
                Role:
              </Label>
              <Input
                className="form-control-alternative"
                id="roleId"
                type="select"
                value={selectedRole}
                onChange={handleRoleSelect}
              >
                <option value="">Select Role:</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
          <Row>
            <Col className="p-3">
              <div>
                <FormGroup>
                  <Input type="select" name="permissions" id="permissions" multiple value={selectedPermissions} readOnly>
                    {permissions.map((permission) => (
                      <option
                        key={permission.id}
                        onClick={() => handlePermissionSelect(permission)}
                      >
                        {permission.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <div>
                  <h4>Selected Permissions:</h4>
                  {selectedPermissions.map((permission) => (
                    <div key={permission.id} onDoubleClick={() => handlePermissionRemove(permission)}>
                      {permission.name}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="modal-footer">
        <Button color="secondary" data-dismiss="modal" type="button" onClick={toggleModal}>
          Close
        </Button>
        <Button color="primary" type="button" onClick={handleSaveChanges}>
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default CreateRolePermissionModal;
