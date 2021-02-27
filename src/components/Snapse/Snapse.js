
import CytoscapeComponent from 'react-cytoscapejs';
import stylesheet from '../stylesheet'
import cytoscape, { Core as CSCore } from "cytoscape";
import useAnimateEdges from './useAnimateEdges';
import { useEffect, useMemo } from 'react';
import { convertElements } from '../../utils/helpers';

const Snapse = ({ neurons, onEdgeCreate, handleChangePosition }) => {
  const [cyRef, setCy] = useAnimateEdges()
  const elements = convertElements(neurons);
  useEffect(()=>{
    const cy = cyRef.current
    if(cy){
      cy.on('mouseup','.snapse-node, .snapse-output',(evt)=>{
        handleChangePosition(evt.position, evt.target.id());
      })
      cy.edgehandles({
        handleNodes: '.snapse-node',
        preview: false,
        loopAllowed: () => true,
        edgeType: function (sourceNode, targetNode) {
          return sourceNode.edgesTo(targetNode).empty() ? 'flat' : undefined
        },
        complete: onEdgeCreate
      })
    }
  },[cyRef]);
  return (
    <CytoscapeComponent
      cy={setCy}
      elements={CytoscapeComponent.normalizeElements(elements)}
      style={{
        width: "100%",
        height: "100%"
      }}
      stylesheet={stylesheet} />
  )
};

export default Snapse;