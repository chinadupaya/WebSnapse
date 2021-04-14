import { Button, Form, Modal } from 'react-bootstrap';
import { useReducer, useState } from 'react';
import { allRulesValid } from "../../utils/helpers";
import shortid from "shortid";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      startingSpikes: 0,
      rules: '',
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

const initialFormState = {id:"", rules:"", startingSpikes:0}; 

const NewNodeForm = ({ showNewNodeModal, handleCloseModal, handleNewNode, handleError }) => {
  const handleClose = () => {
    handleCloseModal();
  };
  const [formData, setFormData] = useReducer(formReducer, initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const handleChange = event => {
    console.log(event.target.value);
    console.log(event.target.name);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };
  function handleSubmit(event) {
    event.preventDefault();
    let newId = `${formData.id}-${shortid.generate()}`;

    if (allRulesValid(formData.rules)) {
      console.log("All rules valid");
      handleClose();
      setSubmitting(true);

      setTimeout(() => {
        setSubmitting(false);
        setFormData({
          reset: true
        })
      }, 3000);
      const newNeuron = {
        id: newId,
        position: { x: 100, y: 100 },
        rules: formData.rules,
        startingSpikes: parseInt(formData.startingSpikes),
        delay: 0,
        spikes: parseInt(formData.startingSpikes),
        isOutput: false,
        out: []
      }
      handleNewNode(newNeuron);
    } else {
      console.log("One or more of the rules is invalid");
      handleError("One or more of the rules is invalid");
      handleClose();
    };
  }

  return (
    <Modal show={showNewNodeModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Node</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Node Name</Form.Label>
            <Form.Control  required name="id" type="text" placeholder="n0" value={formData.id} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Node Rules</Form.Label>
            <Form.Control required name="rules" type="text" placeholder="a/a->a;0 aa/a->a;1" value={formData.rules} onChange={handleChange} />
            <Form.Text className="text-muted">
              Enter valid rules only. Separate each rule with a space.
              </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Starting Spike Number</Form.Label>
            <Form.Control required name="startingSpikes" type="number" value={formData.startingSpikes} onChange={handleChange} />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button> {' '}
          <Button type="submit" variant="primary">
            Save Changes
            </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
export default NewNodeForm;