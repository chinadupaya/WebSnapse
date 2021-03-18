import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { Button, Container, Alert, Row, Col, Form } from 'react-bootstrap';
import styled, { css, keyframes } from 'styled-components'
import Snapse from "./components/Snapse/Snapse";
import shortid from 'shortid';
import { step, backStep } from "./utils/automata";
import ChooseRuleForm from './components/forms/ChooseRuleForm';
import NewNodeForm from './components/forms/NewNodeForm';
import EditNodeForm from './components/forms/EditNodeForm';
import DeleteNodeForm from './components/forms/DeleteNodeForm';
import ChoiceHistory from './components/ChoiceHistory/ChoiceHistory';
var originalNeurons = {
  n1: {
    id: "n1",
    position: { x: 50, y: 50 },
    rules: 'a+/a->a;2',
    startingSpikes: 1,
    delay: 0,
    spikes: 1,
    isOutput: false,
    out: ['n2']
  },
  n2: {
    id: "n2",
    position: { x: 200, y: 50 },
    rules: 'a/a->a;1',
    startingSpikes: 0,
    delay: 0,
    spikes: 0,
    isOutput: false,
    out: ['n3']
  },
  n3: {
    id: "n3",
    position: { x: 400, y: 50 },
    rules: 'a/a->a;0',
    startingSpikes: 1,
    delay: 0,
    spikes: 1,
    isOutput: false,
    out: ["n4"]
  },
  n4: {
    id: "n4",
    position: { x: 400, y: 200 },
    isOutput: true,
    spikes: 0,
    bitstring: ' '
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
  const [neurons, setNeurons] = useImmer(originalNeurons);
  const [time, setTime] = useState(0);
  const [isRandom, setIsRandom] = useState(true);
  const [fileName, setFileName] = useState('');
  const [showNewNodeModal, setShowNewNodeModal] = useState(false);
  const [showChooseRuleModal, setShowChooseRuleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const [pBar, setPBar] = useState(0);  
  const handleClose = () => setShowNewNodeModal(false);
  const handleShow = () => setShowNewNodeModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseChooseRuleModal = () => setShowChooseRuleModal(false);
  const runChooseRule = (rules)=>{
    console.log(rules);
  }
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
      a.download = new Date().toISOString() + "-Neurons.txt";
      a.href = link;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  const handleLoad = (input) => {
    console.log(input);
    let file = input.files[0];
    console.log(file);
    if (file.type && file.type.indexOf('text/plain') === -1) {

      showError("File is not a text file");
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      console.log(JSON.parse(event.target.result));
      setNeurons(draft => draft = JSON.parse(event.target.result));
      setFileName(file.name);
    });
    reader.readAsText(file);
  }

  const onEdgeCreate = async (src, dst) => {
    console.log("newEdge", src, dst);
    await setNeurons(draft => {
      var outCopy = [...draft[src].out];
      outCopy.push(dst)
      draft[src].out = outCopy;
    })


  }
  const handleNewPosition = async (position, id) => {
    setNeurons(draft => {
      draft[id].position = position;
    })

  }
  async function handleNewNode(newNeuron) {
    await setNeurons(draft => {
      draft[newNeuron.id] = newNeuron;
    })
  }
  async function handleNewOutput(){
    await setNeurons(draft => {
      var newId=shortid.generate()
      draft[newId] = {
        id: newId,
        position: { x: 300, y: 300 },
        isOutput: true,
        spikes: 0,
        bitstring: ' '
      }
    })
  }
  async function handleEditNode(id, rules, spikes) {
    console.log("handleEditNode")
    await setNeurons(draft => {
      draft[id].startingSpikes = spikes;
      draft[id].spikes = spikes;
      draft[id].rules = rules;
    })
  }
  async function handleDeleteNode(neuronId) {
    console.log("handleDeleteNode", neuronId);
    console.log(neurons);
    await setNeurons(draft => {
      //first delete edges connected to neuron
      for (var k in draft) {
        var neuron = draft[k];

        if (!neuron.isOutput) {
          const neuronOutKeys = neuron.out;
          let arr = neuron.out.filter(function (item) {
            return item !== neuronId
          });
          draft[k].out = arr;
        }
      }
      //delete neuron
      delete draft[neuronId];
    })
  }
  function handlePlay() {
    setIsPlaying(p => !p);
  }

  const handleReset = () => {
    setNeurons(draft => draft = originalNeurons);
    setTime(0);
    setIsPlaying(false);
    localStorage.clear();
  }
  const onForward = async () => {
    if (time == 0) {
      //copy
      originalNeurons = JSON.parse(JSON.stringify(neurons));
    }
    await setNeurons(neurons => step(neurons,time,isRandom, setShowChooseRuleModal));
    setTime(time => time + 1);
  }
  const onBackward = async () =>{
    if(time > 1){
      var tempTime = time.valueOf();
      await setNeurons(neurons=> backStep(tempTime-2));
      await setTime(time=> time-1);
      
    }
    else if(time==1){
      handleReset();
    }
    
  }
  const neuronsRef = useRef(neurons)
  neuronsRef.current = neurons
  const onIntervalStepRef = useRef(onForward)
  onIntervalStepRef.current = () => {
    onForward();
    setPBar(p => p + 1);
  }
  useEffect(() => {
    if (isPlaying) {
      var interval = setInterval(() => {
        onIntervalStepRef.current()
      }, 3000)
    }
    return () => clearInterval(interval);
  }, [isPlaying, onIntervalStepRef])
  useEffect(()=>{
    if(showChooseRuleModal){
      console.log("showChooseRuleModal is true");
    }
  })
  return (
    <Container>
      {error && <Alert variant="danger">
        {error}
      </Alert>}
      <div style={{ textAlign: "center" }}>
        <h1>WebSnapse</h1>
        <Row>
          <Col>
            <Button variant="primary" onClick={handleShow} disabled={time>0 ? true : false}>New Node</Button>{' '}
            <Button variant="primary" onClick={handleNewOutput} disabled={time>0 ? true : false}>New Output Node</Button>{' '}
            <Button variant="info" onClick={handleShowEditModal} disabled={time>0 ? true : false}>Edit Node</Button>{' '}
            <Button variant="danger" onClick={handleShowDeleteModal} disabled={time>0 ? true : false}>Delete Node</Button>{' '}
          </Col>
          <Col>
            <Row>
              <Col style={{ textAlign: "right" }}><Button variant="primary" onClick={handleSave}>Save</Button>{' '}</Col>
              <Col>
                <Form>
                  <Form.File
                    id="custom-file"
                    label={fileName ? fileName : "Load file..."}
                    custom
                    onChange={(e) => { handleLoad(e.target) }}
                  />
                </Form>

              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ textAlign: "center", paddingTop: "1em" }}>
        <Button onClick={onBackward}>Back</Button>{' '}
        <div style={{ display: 'inline-block' }}>
          <ProgressBar key={pBar} isPlaying={isPlaying} />
          <Button onClick={handlePlay}>{isPlaying ? "Pause" : "Play"}</Button>
        </div> {' '}
        <Button onClick={() => onForward()}>Next</Button>{' '}
        <Button variant="danger" onClick={handleReset}>Restart</Button>{' '}
      </div>
      <div>
        Time: {time == 0 ? "Start playing!" : time} 
        <Form>
          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" 
              label="Pseudorandom" 
              defaultChecked={isRandom}
              onChange={()=>{
                setIsRandom(!isRandom)}} />
          </Form.Group>
        </Form>
      </div>
      <hr />
      <Snapse
        neurons={neurons}
        onEdgeCreate={(src, dst, addedEles) => {
          onEdgeCreate(src.id(), dst.id())
          addedEles.remove();
        }}
        handleChangePosition={handleNewPosition} />
      <ChoiceHistory time={time}/>
      <NewNodeForm showNewNodeModal={showNewNodeModal}
        handleCloseModal={handleClose}
        handleNewNode={handleNewNode}
        handleError={showError} />
      <EditNodeForm showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        handleEditNode={handleEditNode}
        handleError={showError}
        neurons={neurons} />
      <DeleteNodeForm showDeleteModal={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDeleteNode={handleDeleteNode}
        handleError={showError}
        neurons={neurons}
      />
      <ChooseRuleForm showChooseRuleModal={showChooseRuleModal} 
      handleCloseChooseRuleModal={handleCloseChooseRuleModal}/>
    </Container>
  );
}

const shortening = keyframes`
  from {
    transform: scaleX(100%);
  }

  to {
    transform: scaleX(0%);
  }
`
const ProgressBar = styled.div`
  ${props =>
    props.isPlaying &&
    css`
      animation: ${shortening} 3s linear; 
    `}
  background-color: red;
  height: 4px;
  transform-origin: left center;
  margin-bottom: 2px;
`


export default App;
