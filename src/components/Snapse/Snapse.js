
import CytoscapeComponent from 'react-cytoscapejs';
import stylesheet from '../stylesheet'
import cytoscape, { Core as CSCore } from "cytoscape";

const Snapse = ({elements}) => {
    
    return (
            <CytoscapeComponent 
                elements={CytoscapeComponent.normalizeElements(elements)}
                style={ {
                    width: "100%",
                    height: "100%"
                  } }
                stylesheet={stylesheet}/>
    )
};

export default Snapse;