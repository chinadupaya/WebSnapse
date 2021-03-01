import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useReducer, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { Button, Form, Modal, Container, Alert } from 'react-bootstrap';
import Snapse from "./components/Snapse/Snapse";
import { step } from "./utils/automata";
import NewNodeForm from './forms/NewNodeForm';
import EditNodeForm from './forms/EditNodeForm';
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const showError = (text) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, 3000);
  }
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
  async function handleNewNode(newNeuron) {
    await setNeurons(draft=>{
      draft[newNeuron.id] = newNeuron;
    })
  }
  async function handleEditNode(id,rules, spikes) {
    console.log("handleEditNode")
    await setNeurons(draft=>{
      draft[id].startingSpikes = spikes;
      draft[id].spikes = spikes;
      draft[id].rules = rules;
    })
  }
  function handlePlay() {
    setIsPlaying(p => !p);
  }
  const handleClose = () => setShowNewNodeModal(false);
  const handleShow = () => setShowNewNodeModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
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
        <Button variant="info" onClick={handleShowEditModal}>Edit Node</Button>{' '}
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
      <NewNodeForm showNewNodeModal={showNewNodeModal}
       handleCloseModal={handleClose} 
       handleNewNode={handleNewNode}
       handleError={showError} />
      <EditNodeForm showEditModal={showEditModal}
      handleCloseEditModal={handleCloseEditModal}
      handleEditNode = {handleEditNode}
      handleError={showError}
      neurons={neurons} />

    </Container>
  );
}

export default App;
