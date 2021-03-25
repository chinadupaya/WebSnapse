
import CytoscapeComponent from 'react-cytoscapejs';
import stylesheet from '../stylesheet'
import cytoscape, { Core as CSCore } from "cytoscape";
import {Button, Container} from 'react-bootstrap';
import useAnimateEdges from './useAnimateEdges';
import { useEffect, useMemo } from 'react';
import { convertElements } from '../../utils/helpers';

const Snapse = ({ neurons, onEdgeCreate, handleChangePosition }) => {
  const [cyRef, setCy] = useAnimateEdges()
  function handleCenterGraph(){
    const cy = cyRef.current;
    if(cy){
      cy.center();
      cy.fit();
      cy.zoom({
        level: 0.8,
        position: { x: 100, y: 100 }
      });
    }
  }
  const elements = convertElements(neurons);
  useEffect(()=>{
    const cy = cyRef.current
    if(cy){
      cy.on('mouseup','.snapse-node, .snapse-output',(evt)=>{
        console.log("change position", evt.target.id())
        handleChangePosition(evt.position, evt.target.id());
      })
      cy.edgehandles({
        handleNodes: '.snapse-node, .snapse-output',
        preview: false,
        loopAllowed: () => false,
        edgeType: function (sourceNode, targetNode) {
          return 'flat'
          //return sourceNode.edgesTo(targetNode).empty() ? 'flat' : undefined
        },
        complete: onEdgeCreate
      });
      
      /* cy.center();
      cy.fit();
      cy.viewport({
        zoom: 1,
        pan: { x: 100, y: 100 }
      }); */
    }
  },[cyRef]);
  return (
    <div style={{
      width: "100%",
      height: "100%"
    }}>
      <Button variant="info" onClick={handleCenterGraph}>Center Graph</Button>
    <CytoscapeComponent
      cy={setCy}
      elements={CytoscapeComponent.normalizeElements(elements)}
      style={{
        width: "100%",
        height: "100%"
      }}
      stylesheet={stylesheet} />
    </div>
  )
};

export default Snapse;