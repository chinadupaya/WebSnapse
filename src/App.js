import './scss/custom.scss';
import './App.css';
import { slide as Menu } from 'react-burger-menu'
import { useState, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { Button, Container, Alert, Row, Col, Form, OverlayTrigger, Tooltip, Dropdown } from 'react-bootstrap';
import { PlayFill, PauseFill, SkipForwardFill, SkipBackwardFill, QuestionCircle, ClockFill, ClockHistory, PlusSquare, Save2 } from 'react-bootstrap-icons';
import styled, { css, keyframes } from 'styled-components'
import Snapse from "./components/Snapse/Snapse";
import shortid from 'shortid';
import { step, backStep, parseRule } from "./utils/automata";
import ChooseRuleForm from './components/forms/ChooseRuleForm';
import NewNodeForm from './components/forms/NewNodeForm';
import NewOutputNodeForm from './components/forms/NewOutputNodeForm';
import EditNodeForm from './components/forms/EditNodeForm';
import DeleteNodeForm from './components/forms/DeleteNodeForm';
import ChoiceHistory from './components/ChoiceHistory/ChoiceHistory';
import convert from 'xml-js';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { saveAs } from 'file-saver';
import useUnsavedChanges from './components/useUnsavedChanges/useUnsavedChanges';
import { original } from 'immer';
var options = { compact: true, ignoreComment: true, spaces: 4, sanitize: false };
var originalNeurons = (window.localStorage.getItem('neurons') != null) ?  JSON.parse(window.localStorage.getItem('neurons')) : {
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
};

function useKey(key, cb){
  const isFocus = useRef(false);
  const callbackRef = useRef(cb);

  const inputs = document.getElementsByTagName('input');

  useEffect( () => {for (let input of inputs) {
    input.addEventListener('focusin', () => {isFocus.current = true; console.log("fOCUS ON ME");});
    input.addEventListener('input', () => {isFocus.current = true; console.log("fOCUS ON ME 2");});
    input.addEventListener('focus', () => {isFocus.current = true; console.log("fOCUS ON ME 3");}, true);
    input.addEventListener('focusout', () => {isFocus.current = false});
    }
  })

  useEffect(() => {
    callbackRef.current = cb;
  });
  useEffect(()=> {
    function debounced(delay, fn) {
      let timerId;
      return function (...args) {
        if (timerId) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
          fn(...args);
          timerId = null;
        }, delay);
      }
    }

  function handleKeyDown(event){
    console.log(`isFocus ${isFocus.current}`);
    if(event.code === key && isFocus.current == false ){
      console.log(`handleKeyDown isFocus: ${isFocus.current}`)
      //event.preventDefault();
      console.log("Key pressed: " + event.code);
      callbackRef.current(event);
      }
    }

  document.addEventListener("keydown", (event) => {if(event.code === "Space"&& isFocus == false){event.preventDefault();}});
  document.addEventListener("keydown", (debounced(300, handleKeyDown)));
  return () => document.removeEventListener("keydown", handleKeyDown);
    }, [key]);
}

function App() {
  const [neurons, setNeurons] = useImmer(originalNeurons);
  const [time, setTime] = useState(0);
  const [isRandom, setIsRandom] = useState(true);
  const [fileName, setFileName] = useState('');
  const [Prompt, setDirty, setPristine] = useUnsavedChanges(neurons);
  const [showNewNodeModal, setShowNewNodeModal] = useState(false);
  const [showNewOutputModal, setShowNewOutputModal] = useState(false);
  const [showChooseRuleModal, setShowChooseRuleModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChoiceHistoryModal, setShowChoiceHistoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [error, setError] = useState("");
  const [pBar, setPBar] = useState(0);
  const handleClose = () => setShowNewNodeModal(false)
  const handleShow = () => setShowNewNodeModal(true)
  const handleCloseNewOutputModal = () => setShowNewOutputModal(false);
  const handleShowNewOutputModal = () => setShowNewOutputModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseChooseRuleModal = () => setShowChooseRuleModal(false);
  const handleShowChoiceHistoryModal = () => setShowChoiceHistoryModal(true);
  const handleCloseHoiceHistoryModal = () => setShowChoiceHistoryModal(false);
  const handleSimulationEnd = () => {
    setHasEnded(true);
    setIsPlaying(false);
    console.log("alert from simulationEnd");
    alert("Simulation has ended.");
  }

  const showError = (text) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, 3000);
  }
  const handleSave = () => {
    //Convert JSON Array to string.
    var wrapper = { content: neurons };
    //console.log(neurons);
    var result = convert.json2xml(wrapper, options);
    //console.log(wrapper);
    var blob = new Blob([result], { type: "text/xml;charset=utf-8", });
    saveAs(blob, Date().toString() + "-Neurons.xmp");
    setPristine();
  }
  const handleLoad = (input) => {
    let file = input.files[0];
    setHasEnded(false);

    if (file.type && file.type.indexOf('text/xml') === -1) {

      showError("File is not a xml file");
      return;
    }
    const reader = new FileReader();
    function nativeType(value) {
      var nValue = Number(value);
      if (!isNaN(nValue)) {
        return nValue;
      }
      var bValue = value.toLowerCase();
      if (bValue === 'true') {
        return true;
      } else if (bValue === 'false') {
        return false;
      }
      return value;
    }
    var removeJsonTextAttribute = async function (value, parentElement) {
      try {
        const parentOfParent = parentElement._parent;
        const pOpKeys = Object.keys(parentElement._parent);
        const keyNo = pOpKeys.length;
        const keyName = pOpKeys[keyNo - 1];
        const arrOfKey = parentElement._parent[keyName];
        const arrOfKeyLen = arrOfKey.length;
        if (arrOfKeyLen > 0) {
          const arr = arrOfKey;
          const arrIndex = arrOfKey.length - 1;
          arr[arrIndex] = value;
        } else if (keyName == "out") {
          parentElement._parent[keyName] = [value];
        } else if (keyName == "bitstring") {
          console.log("bitstring");
          parentElement._parent[keyName] = "";
        }
        else {
          parentElement._parent[keyName] = nativeType(value);
        }

      } catch (e) { }
    }
    reader.addEventListener('load', async (event) => {
      var options = {
        compact: true,
        trim: true,
        ignoreDeclaration: true,
        ignoreInstruction: true,
        ignoreAttributes: true,
        ignoreComment: true,
        ignoreCdata: true,
        ignoreDoctype: true,
        textFn: removeJsonTextAttribute
      };
      var result = await convert.xml2js(event.target.result, options);
      console.log("Result.content"); 
      await setNeurons(draft => draft = result.content);
      await setNeurons(draft => {
        for (var k in draft) {
          if (draft[k].bitstring) {
            console.log(draft[k].bitstring);
            draft[k].bitstring = " ";
          }
        }
      })
      originalNeurons = result.content;
      setFileName(file.name);
    });
    reader.readAsText(file);
    setTime(0);
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
    });
    setDirty(true);

  }
  async function handleNewNode(newNeuron) {
    await setNeurons(draft => {
      draft[newNeuron.id] = newNeuron;
    })
    setDirty(true);
  }
  async function handleNewOutput(newOutput) {
    await setNeurons(draft => {
      draft[newOutput.id] = newOutput;
    });
    setDirty(true);
  }
  async function handleEditNode(id, rules, spikes) {
    //console.log("handleEditNode")
    await setNeurons(draft => {
      draft[id].startingSpikes = spikes;
      draft[id].spikes = spikes;
      draft[id].rules = rules;
    });
    setDirty(true);
    originalNeurons = neurons; //for restart
    //window.localStorage.setItem('neurons', JSON.stringify(neurons));
  }
  async function handleDeleteNode(neuronId) {
    console.log("handleDeleteNode", neuronId);
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
    console.log(neurons);
    originalNeurons = neurons;
    setDirty(true);
    //window.localStorage.setItem('neurons', JSON.stringify(neurons));
  }
  function handlePlay() {
    if (!hasEnded){
      console.log(`isPlaying before ${isPlaying}`);
      setIsPlaying(p => !p);
      console.log(`isPlaying after ${isPlaying}`);
    }else{
      alert("Simulation has ended.");
    }
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Pseudorandom will allow the system to decide which rule will be executed. Unchecking it will let you decide.
    </Tooltip>
  );
  const handleReset = () => {
    setNeurons(draft => draft = originalNeurons);
    setTime(0);
    setIsPlaying(false);
    setHasEnded(false);
    localStorage.clear();
  }
  const [guidedRules, setGuidedRules] = useState({});
  const handleStartGuidedMode = async (rules) => {
    await setGuidedRules(rules);

    console.log(rules);
    setShowChooseRuleModal(true);
    if (setShowChooseRuleModal) {
      setIsPlaying(false); //pauses the graph playing while choosing rule
    }
  }
  const handleChosenRules = (data) => {
    handleCloseChooseRuleModal();
    setNeurons((draft) => {
      for (var j in draft) {
        for (var k in data) {
          if (j == k) {
            var [requires, grouped, symbol, consumes, produces, delay] = parseRule(data[k]);
            draft[j].delay = delay
            //console.log(data[k]);
            draft[j].currentRule = data[k];
            draft[j].chosenRule = data[k];
          }
        }
      }
    });
    setIsPlaying(true); // continue playing after choosing rule
  }
  const onForward = async () => {
    if (time == 0) {
      //copy
      console.log("Time is: " + time);
      originalNeurons = JSON.parse(JSON.stringify(neurons));
    }
    if (!hasEnded) {
      await setNeurons(neurons => step(neurons, time, isRandom, handleStartGuidedMode, handleSimulationEnd));
      setTime(time => time + 1);
    }else{
      alert("Simulation has ended.");
    } 
  }
  const onBackward = async () => {
    if (time > 1) {
      var tempTime = time.valueOf();
      setHasEnded(false);
      await setNeurons(neurons => backStep(tempTime - 2));
      await setTime(time => time - 1);

    }
    else if (time == 1) {
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

  useEffect(() => {
    if (showChooseRuleModal) {
      console.log("showChooseRuleModal is true");
    }
  }, [])

    // Key Bindings 
    function handleSpace(){
      console.log("Space Pressed");
      setIsPlaying(p => !p);
    }
  
    function handleRightKey(){
      console.log("Right Key Pressed");
      if(!hasEnded){
        onIntervalStepRef.current();
      }
    }
  
    function handleLeftKey(){
      console.log("Left Key Pressed");
      onBackward();
    }
  
    useKey("Space", handleSpace);
    useKey("ArrowLeft", handleLeftKey);
    useKey("ArrowRight", handleRightKey);
  

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Container>
            {error && <Alert variant="danger">
              {error}
            </Alert>}
            <Menu>
              
              <Form>
                <Form.File
                  id="custom-file"
                  label={fileName ? fileName : "Load file..."}
                  custom
                  onChange={(e) => { handleLoad(e.target) }}
                />
              </Form>
              <div>
                <Button variant="primary" disabled={time > 0 ? true : false} onClick={handleSave}><Save2/>{' '}Save</Button>
              </div>
              <div>
                <Button variant="primary" onClick={handleShowChoiceHistoryModal}><ClockHistory/>{' '}Choice History</Button>
              </div>
            </Menu>
            <div>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontWeight: "700"}} className="text-primary">WebSnapse</h1>
            </div>
            <Row>
              <Col>
                <div>
                  
                  <Form>
                    <Form.Group id="formGridCheckbox">
                      <Row>
                        <Col sm={6}>
                          <Form.Check type="checkbox"
                            label="Pseudorandom"
                            defaultChecked={isRandom}
                            onChange={() => {
                              setIsRandom(!isRandom)
                            }} />
                        </Col>

                        <Col sm={1} style={{ textAlign: "left" }}>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                          >
                            <QuestionCircle />
                          </OverlayTrigger>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                  { time == 0 ? <div></div> : 
                    <div style={{backgroundColor:"#778beb", color:"white", borderRadius:"10px", padding:"0.5em"}}>
                      <ClockFill color="white" size={30}/> <strong>Time:</strong> {time == 0 ? "Start playing!" : time}
                    </div>
                  }
                  
                </div>
              </Col>
              <Col>
              <div className="snapse-controls" style={{ textAlign: "center", marginBottom:"0.8em" }}>
                <Button variant="link" onClick={onBackward}><SkipBackwardFill /></Button>{' '}
                <div style={{ display: 'inline-block' }}>
                  <ProgressBar key={pBar} isPlaying={isPlaying} />
                  <Button size="lg" className="snapse-controls-play" onClick={handlePlay}>{isPlaying ? <PauseFill /> : <PlayFill />}</Button>
                </div> {' '}
                <Button variant="link" onClick={() => onForward()}><SkipForwardFill /></Button>{' '}

              </div>
              <div style={{textAlign:"center"}}>
              <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <PlusSquare/>{' '}Node Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Dropdown.Item><Button variant="link" size="sm" className="node-actions text-primary" onClick={handleShow} disabled={time > 0 ? true : false}>New Node</Button></Dropdown.Item>
                <Dropdown.Item><Button variant="link" size="sm" className="node-actions text-primary" onClick={handleShowNewOutputModal} disabled={time > 0 ? true : false}>New Output Node</Button></Dropdown.Item>
                <Dropdown.Item><Button variant="link" size="sm" className="node-actions text-info" onClick={handleShowEditModal} disabled={time > 0 ? true : false}>Edit</Button></Dropdown.Item>
                <Dropdown.Item><Button variant="link" size="sm" className="node-actions text-danger" onClick={handleShowDeleteModal} disabled={time > 0 ? true : false}>Delete</Button></Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
              </div>
              </Col>
              <Col style={{textAlign:"right"}}><Button variant="danger" onClick={handleReset}>Restart</Button>{' '}</Col>
            </Row>
            </div>
            <hr />
            <Snapse
              neurons={neurons}
              onEdgeCreate={(src, dst, addedEles) => {
                onEdgeCreate(src.id(), dst.id())
                addedEles.remove();
              }}
              handleChangePosition={handleNewPosition} />
            <ChoiceHistory time={time}
            showChoiceHistoryModal={showChoiceHistoryModal}
            handleCloseHoiceHistoryModal={handleCloseHoiceHistoryModal} />
            <NewNodeForm showNewNodeModal={showNewNodeModal}
              handleCloseModal={handleClose}
              handleNewNode={handleNewNode}
              handleError={showError} />
            <NewOutputNodeForm showNewOutputModal={showNewOutputModal}
              handleCloseNewOutputModal={handleCloseNewOutputModal}
              handleNewOutput={handleNewOutput}
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
              handleCloseChooseRuleModal={handleCloseChooseRuleModal}
              rules={guidedRules}
              handleChosenRules={handleChosenRules}
            />
            {Prompt}
          </Container>
        </Route>
      </Switch>
    </Router>
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
  background-color: #c44569;
  height: 4px;
  transform-origin: left center;
  margin-bottom: 2px;
`


export default App;
