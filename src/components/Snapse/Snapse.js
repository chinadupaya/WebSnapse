
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
      cy.gridGuide({
        guidelinesStyle: {
        strokeStyle: "black",
        horizontalDistColor: "#ff0000",
        verticalDistColor: "green",
        initPosAlignmentColor: "#0000ff",
        }
      });
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
      /*
      cy.layout({name: 'grid', fit: true, // whether to fit the viewport to the graph
        padding: 30, // padding used on fit
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        condense: false, // uses all available space on false, uses minimal space on true
        rows: undefined, // force num of rows in the grid
        cols: undefined, // force num of columns in the grid
        position: function( node ){}, // returns { row, col } for element
        sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position ){ return position; }});*/
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