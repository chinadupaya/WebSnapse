import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useReducer, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { Button, Form, Modal, Container, Alert } from 'react-bootstrap';
import Snapse from "./components/Snapse/Snapse";
import shortid from "shortid";
import { step } from "./utils/automata";
import { convertElements, allRulesValid } from "./utils/helpers";
import produce from "immer";
var originalNeurons = {
  n1: {
    id: "n1",
    position: {x: 50, y:50},
    rules: 'a+/a->a;2',
    startingSpikes: 1,
    delay:0,
    spikes: 1,
    isOutput:false,
    out: ['n2']
  },
  n2: {
    id: "n2",
    position: {x: 200, y:50},
    rules: 'a/a->a;1',
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
    startingSpikes: 1,
    delay:0,
    spikes: 1,
    isOutput:false,
    out:["n4"]
  },
   n4: {
    id: "n4",
    position: {x: 400, y:200},
    isOutput:true,
    spikes: 0,
    bitstring:' '
  }  
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
  const [neurons,setNeurons] = useImmer(originalNeurons);
  const [time, setTime] = useState(-1);
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
  const handleSave = () => {
    //Convert JSON Array to string.
    var json = JSON.stringify(neurons);
 
    //Convert JSON string to BLOB.
    json = [json];
    var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

    //Check the Browser.
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, Date().toString() + "-Neurons.txt");
    } else {
        var url = window.URL || window.webkitURL;
        var link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = Date().toString() + "-Neurons.txt";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
  }
  const onEdgeCreate = async (src, dst) => {
    console.log("newEdge", src, dst);
    await setNeurons(draft=>{
      var outCopy = [...draft[src].out];
      outCopy.push(dst)
      draft[src].out = outCopy;
    })
    
    
  }
  const handleNewPosition = async (position, id) =>{
    setNeurons(draft=>{
      draft[id].position = position;
    })
 
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
      const newNeuron = { 
        id: newId,
        position: {x: 100, y:100},
        rules: formData.rules,
        startingSpikes: parseInt(formData.startingSpikes),
        delay: 0,
        spikes: parseInt(formData.startingSpikes),
        isOutput:false,
        out:[]}
      await setNeurons(draft=>{
        draft[newId] = newNeuron;
      })
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
  const handleReset = ()=>{
    setNeurons(draft=>draft=originalNeurons);
    setTime(-1);
  }
  const onForward = async () => {
    if(time==-1){
      //copy
      originalNeurons = JSON.parse(JSON.stringify(neurons));
    }
    await setNeurons(neurons => step(neurons));
    setTime(time=>time+1);
    
  }
  const neuronsRef = useRef(neurons)
  neuronsRef.current = neurons
  const onIntervalStepRef = useRef(onForward)
  onIntervalStepRef.current = () => {
    onForward(neurons);
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
        
        <Button onClick={handlePlay}>{isPlaying ? "Pause" : "Play"}</Button>{' '}
        <Button>Back</Button>{' '}
        <Button onClick={() => onForward()}>Next</Button>{' '}
        <Button variant="primary" onClick={handleSave}>Save</Button>{' '}
        <Button variant="danger" onClick={handleReset}>Reset</Button>
      </div>
      <div style={{textAlign:"center", paddingTop:"1em"}}>
        <Button variant="primary" onClick={handleShow}>New Node</Button>{' '}
        <Button variant="info">Edit Node</Button>{' '}
        <Button variant="danger">Delete Node</Button>{' '}

      </div>
      <div>
        Time: {time == -1 ? "Start playing!" : time }
      </div>
      <hr />
      <Snapse
        neurons={neurons}
        onEdgeCreate={(src, dst, addedEles) => {
          onEdgeCreate(src.id(), dst.id())
          addedEles.remove();
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
