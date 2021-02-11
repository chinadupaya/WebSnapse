import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useReducer } from "react";
import { Button, Form, Modal, Container } from 'react-bootstrap';
import Snapse from "./components/Snapse/Snapse";
import shortid from "shortid";
import { createNeuron } from "./utils/helpers";
const originalElements = {
  nodes: [
    { data: { id: 'n1', label:'n1' }, position: { x: 0, y: 0 }, classes: 'snapse-node' },
    { data: { id: 'n1-rules', parent: 'n1', label: 'Rules of node 1' }, position: { x: 0, y: 0 }, classes: 'snapse-node__rules' },
    { data: { id: 'n1-spike', parent: 'n1', label: '0' }, position: { x: 0, y: 0+60 }, classes: 'snapse-node__spike' },
    { data: { id: 'n1-time', parent: 'n1', label: '3' }, position: { x: 0, y: 0+90 }, classes: 'snapse-node__time' },
    { data: { id: 'n2', label:'n2'}, position: { x: 200, y: 0 }, classes: 'snapse-node' },
    { data: { id: 'n2-rules', parent: 'n2', label: 'Rules of node 2' }, position: { x: 200, y: 0 }, classes: 'snapse-node__rules' },
    { data: { id: 'n2-spike', parent: 'n2', label: '0' }, position: { x: 200, y: 0+60 }, classes: 'snapse-node__spike' },
    { data: { id: 'n2-time', parent: 'n2', label: '3' }, position: { x: 200, y: 0+90 }, classes: 'snapse-node__time' },
  ],
  edges: [{
    data: { id: 'n1-n2', source: 'n1', target: 'n2' }
  }]
}
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

function App() {
  const [elements, setElements] = useState(originalElements);
  const [showNewNodeModal, setShowNewNodeModal] = useState(false);
  const [formData, setFormData] = useReducer(formReducer,{});
  const [submitting, setSubmitting] = useState(false);
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }
  async function handleNewNode(event) {
    event.preventDefault();
    let newId = shortid.generate();
    handleClose();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
       reset: true
     })
    }, 3000);
    
    let newNodes = await createNeuron(newId, 100, 100, formData.rules, formData.startingSpikes, 0);
    let newElements = JSON.parse(JSON.stringify(elements));
   
    newElements.nodes.push(newNodes[0])
    newElements.nodes.push(newNodes[1])
    newElements.nodes.push(newNodes[2])
    newElements.nodes.push(newNodes[3])
    console.log(newElements)
    setElements(newElements);
  }
  const handleClose = () => setShowNewNodeModal(false);
  const handleShow = () => setShowNewNodeModal(true);
  return (
    <Container>
      <div style={{textAlign:"center"}}>
        <h1>WebSnapse</h1>
        <Button variant="primary" onClick={handleShow}>New Node</Button>{' '}
      </div>
      <hr />
      <Snapse
        elements={elements} />
      <Modal show={showNewNodeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewNode}>
            <Form.Group>
              <Form.Label>Node Rules</Form.Label>
              <Form.Control name="rules" type="text" placeholder="a/a->a;0 aa/a->a;1" value={formData.rules} onChange={handleChange} />
              <Form.Text className="text-muted">
                Enter valid rules only. Separate each rule with a space.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Starting Spike Number</Form.Label>
              <Form.Control name="startingSpikes" type="number" placeholder="0" value={formData.startingSpikes} onChange={handleChange}/>
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
      </Container>
  );
}

export default App;
