import React, {useState} from "react";
import { Button, Form, Input, Modal, Row, Col, FormGroup, Label } from "reactstrap";

const CreateCourseModal = (props) => {
  const {
    handleSaveChanges,
    createCourseModal,
    toggleCreateModal,
  } = props;

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setFormData({
      ...formData,
      name: newName
    });
  };
  
  const handleSaveClick = () => {
    const updatedFormData = {
      ...formData,
    };
    props.handleSaveChanges(updatedFormData);
  };
  

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={props.createCourseModal}
      toggle={props.toggleCreateModal}
      size={"md"}
    >
      <div className="modal-header">
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={props.toggleCreateModal}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <Row>
            <Col>
              <Label for="name" size="md">
                Add Course
              </Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <FormGroup>
                  <div>
                    <Row className='p-2'>
                      <Col>
                        <Label for="title" size="md">
                          TItle
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="title"
                          type="text"
                          value={formData.title}
                          onChange={handleNameChange}
                        />
                      </Col>
                      <Col>
                        <Label for="code" size="md">
                          Code
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="code"
                          type="number"
                          value={formData.code}
                          onChange={handleNameChange}
                        />
                      </Col>
                    </Row>
                    <Row className='p-2'>
                      <Col>
                        <Label for="credit_hours" size="md">
                          Credit Hours
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="credit_hours"
                          type="number"
                          value={formData.credit_hours}
                          onChange={handleNameChange}
                        />
                      </Col>
                     
                    </Row>
                  </div>
                </FormGroup>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="modal-footer">
        <Button color="secondary" data-dismiss="modal" type="button" onClick={toggleCreateModal}>
          Close
        </Button>
        <Button color="primary" type="button" onClick={handleSaveClick} >
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCourseModal;
