import React, {useState} from "react";
import { Button, Form, Input, Modal, Row, Col, FormGroup, Label } from "reactstrap";

const CreateTeacherModal = (props) => {
  const {
    handleSaveChanges,
    designations,
    selectedDesignation,
    handleDesignationSelect,
    toggleModal,
  } = props;

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    designation: `${selectedDesignation}`,
    department: "",
    contact_no: "",
    email: "",
    courses: []
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
  
    if (id === "courses") {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value.split(',').map(course => course.trim())
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };
  
  const handleSaveClick = () => {
    props.handleSaveChanges(formData);
  };  
  

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={props.createTeacherModal}
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
              <Label for="name" size="md">
                Add Teacher
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
                        <Label for="name" size="md">
                          Name
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col>
                        <Label for="image" size="md">
                          Image
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="image"
                          type="text"
                          value={formData.image}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                    
                    <Row className='p-2'>
                      <Col>
                        <Label for="designation" size="md">
                          Designation
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="designation"
                          name="designation"
                          type="select"
                          value={selectedDesignation}
                          onChange={handleDesignationSelect}
                        >
                          <option value="">Select Designation:</option>
                          {designations.map((designation, index) => (
                            <option key={index} value={designation.id}>
                              {designation.name}
                            </option>
                          ))}
                        </Input>
                      </Col>
                      <Col>
                        <Label for="department" size="md">
                          Department
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="department"
                          type="text"
                          value={formData.department}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>

                    <Row className='p-2'>
                      <Col>
                        <Label for="contact_no" size="md">
                          Contact_no
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="contact_no"
                          type="text"
                          value={formData.contact_no}
                          onChange={handleInputChange}
                        />
                      </Col>

                      <Col>
                        <Label for="email" size="md">
                          Email
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="email"
                          type="text"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>

                    <Row className='p-2'>
                      <Col>
                          <Label for="courses" size="md">
                            Courses
                          </Label>
                          <Input
                            className="form-control-alternative"
                            id="courses"
                            type="text"
                            value={formData.courses.join(', ')}
                            onChange={handleInputChange}
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
        <Button color="secondary" data-dismiss="modal" type="button" onClick={toggleModal}>
          Close
        </Button>
        <Button color="primary" type="button" onClick={handleSaveClick} >
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default CreateTeacherModal;
