import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useReducer, useEffect, useRef } from "react";
import { Button, Form, Modal, Container, Alert } from 'react-bootstrap';
import Snapse from "./components/Snapse/Snapse";
import shortid from "shortid";
import { initialize,step } from "./utils/automata";
import { createNeuron, convertElements, allRulesValid } from "./utils/helpers";
import produce from "immer";
const originalNeurons = {
  n1: {
    id: "n1",
    position: {x: 50, y:50},
    rules: 'a+/a->a;2',
    startingSpikes: 3,
    delay:0,
    spikes: 3,
    isOutput:false,
    out: ['n2']
  },
  n2: {
    id: "n2",
    position: {x: 200, y:50},
    rules: 'aa/a->a;1',
    startingSpikes: 0,
    delay:0,
    spikes: 0,
    isOutput:false,
    out: ['n3']
  },
  n3: {
    id: "n3",
    position: {x: 400, y:50},
    rules: 'a/a->a;0',
    startingSpikes: 0,
    delay:0,
    spikes: 0,
    isOutput:false,
    out:["n4"]
  },
   n4: {
    id: "n4",
    position: {x: 400, y:200},
    isOutput:true,
    spikes: 0
  }  
}
/* const originalElements = {
  nodes: [
    { data: { id: 'n1', label: 'n1' }, position: { x: 50, y: 50 }, classes: 'snapse-node' },
    { data: { id: 'n1-rules', parent: 'n1', label: 'a+/a->a;2' }, position: { x: 50, y: 50 }, classes: 'snapse-node__rules' },
    { data: { id: 'n1-spike', parent: 'n1', label: 0 }, position: { x: 50, y: 50 + 60 }, classes: 'snapse-node__spike' },
    { data: { id: 'n1-time', parent: 'n1', label: 0 }, position: { x: 50, y: 50 + 90 }, classes: 'snapse-node__time' },
    { data: { id: 'n2', label: 'n2' }, position: { x: 200, y: 50 }, classes: 'snapse-node' },
    { data: { id: 'n2-rules', parent: 'n2', label: 'a/a->a;1' }, position: { x: 200, y: 50 }, classes: 'snapse-node__rules' },
    { data: { id: 'n2-spike', parent: 'n2', label: 0 }, position: { x: 200, y: 50 + 60 }, classes: 'snapse-node__spike' },
    { data: { id: 'n2-time', parent: 'n2', label: 0 }, position: { x: 200, y: 50 + 90 }, classes: 'snapse-node__time' },
    { data: { id: 'n3', label: 'n3' }, position: { x: 400, y: 50 }, classes: 'snapse-node' },
    { data: { id: 'n3-rules', parent: 'n3', label: 'a/a->a;0' }, position: { x: 400, y: 50 }, classes: 'snapse-node__rules' },
    { data: { id: 'n3-spike', parent: 'n3', label: 0 }, position: { x: 400, y: 50 + 60 }, classes: 'snapse-node__spike' },
    { data: { id: 'n3-time', parent: 'n3', label: 0 }, position: { x: 400, y: 50 + 90 }, classes: 'snapse-node__time' },
  ],
  edges: [
    {
      data: { id: 'n1-n2', source: 'n1', target: 'n2' }
    },
    {
      data: { id: 'n2-n3', source: 'n2', target: 'n3' }
    }
  ]
} */
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
  const [elements, setElements] = useState(convertElements(originalNeurons));
  const [neurons,setNeurons] = useState(originalNeurons);
  const [neuronsState, setNeuronsState] = useState(() => initialize(originalNeurons))
  const [showNewNodeModal, setShowNewNodeModal] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const showError = (text) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, 3000);
  }
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };
  const onEdgeCreate = (src, dst) => {
    console.log("newEdge", src, dst);
    let newElements = JSON.parse(JSON.stringify(elements));
    newElements.edges.push({
      data: {
        id: src + '-' + dst,
        source: src,
        target: dst
      }
    })
    originalNeurons[src].out.push(dst);
  }
  const handleNewPosition = async (position, id) =>{
    console.log(position, id);
    const newPosition = await produce(neurons, draft => {
      draft[id].position = position;
    })
    setNeurons(newPosition);
  }
  async function handleNewNode(event) {
    event.preventDefault();
    let newId = shortid.generate();

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

      let newNodes = await createNeuron(newId, 100, 100, formData.rules, formData.startingSpikes, 0);
      let newElements = JSON.parse(JSON.stringify(elements));

      newElements.nodes.push(newNodes[0])
      newElements.nodes.push(newNodes[1])
      newElements.nodes.push(newNodes[2])
      newElements.nodes.push(newNodes[3])
      setElements(newElements);
      originalNeurons[newId] = {
        id: newId,
        position: {x: 100, y:100},
        rules: formData.rules,
        spikes: formData.startingSpikes,
        isOutput:false,
        out:[]
      }
    } else {
      console.log("One or more of the rules is invalid");
      showError("One or more of the rules is invalid");
      handleClose();
    };

  }
  function handlePlay() {
    setIsPlaying(p => !p);
  }
  const handleClose = () => setShowNewNodeModal(false);
  const handleShow = () => setShowNewNodeModal(true);
  const onForward = async (neurons) => {
    console.log("Forward step");
    await setNeurons(neurons => step(neurons));
    //console.log(neurons);
    //console.log(neuronsState);

  }
  const neuronsRef = useRef(originalNeurons)
  neuronsRef.current = originalNeurons
  const onIntervalStepRef = useRef(onForward)
  onIntervalStepRef.current = () => {
    onForward(originalNeurons)
    //setPBar(p => p + 1)
  }
  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        onIntervalStepRef.current()
      }, 3000)
    }
  }, [isPlaying])
  return (
    <Container>
      {error && <Alert variant="danger">
        {error}
      </Alert>}
      <div style={{ textAlign: "center" }}>
        <h1>WebSnapse</h1>
        <Button variant="primary" onClick={handleShow}>New Node</Button>{' '}
        <Button onClick={handlePlay}>{isPlaying ? "Pause" : "Play"}</Button>{' '}
        <Button>Back</Button>{' '}
        <Button onClick={()=>{onForward(originalNeurons)}}>Next</Button>{' '}
      </div>
      <hr />
      <Snapse
        neurons={neurons}
        onEdgeCreate={(src, dst) => {
          onEdgeCreate(src.id(), dst.id())
        }}
        handleChangePosition={handleNewPosition} />
      <Modal show={showNewNodeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewNode}>
            <Form.Group>
              <Form.Label>Node Rules</Form.Label>
              <Form.Control required name="rules" type="text" placeholder="a/a->a;0 aa/a->a;1" value={formData.rules} onChange={handleChange} />
              <Form.Text className="text-muted">
                Enter valid rules only. Separate each rule with a space.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Starting Spike Number</Form.Label>
              <Form.Control required name="startingSpikes" type="number" placeholder="0" value={formData.startingSpikes} onChange={handleChange} />
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
