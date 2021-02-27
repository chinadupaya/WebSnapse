export const createNeuron = (newId, x,
    y,
    rules,
    spike,
    time) => [{
        data: {
            id: newId,
            label: newId
        },
        position: { x: x, y: y },
        classes: 'snapse-node'
    },
    {
        data: {
            id: newId + '-rules',
            parent:newId,
            label: rules
        },
        position: { x: x, y: y },
        classes: 'snapse-node__rules'
    },
    {
        data: {
            id: newId + '-spike',
            parent: newId,
            label: spike
        },
        position: { x: x, y: y + 60 },
        classes: 'snapse-node__spike'
    },
    {
        data: {
            id: newId + '-time',
            parent: newId,
            label: time
        },
        position: { x: x, y: y + 90 },
        classes: 'snapse-node__time'
    }];
export const createOutputNeuron = (id,x,y,label,output,spike) => [
    {
        data: { rootId: id, id: `${id}`, label },
        classes: 'snapse-output',
        position: { x: 0, y: 0 }
      },
      {
        data: { rootId: id, id: `${id}-output`, parent: id, label: output },
        classes: 'snapse-node__output',
        position: { x, y: y }
      },
      {
        data: { rootId: id, id: `${id}-spike`, parent: id, label: spike },
        classes: 'snapse-node__spike',
        position: { x, y: y + 40 }
      }
]
export const checkValidRule = (rule) =>{
    var pattern = /(a+)\/(a+)->(a+);([0-9]+)/;
    var result = pattern.exec(rule);
    console.log(result);
    return result;
}

export const createEdge = (src,dst) =>{
    return {
        data: {
          id: src + '-' + dst,
          source: src,
          target: dst
        }
      }
}

export const allRulesValid = (rules) => {
    var splitRules = rules.split(" ");
    var count = 0;
    for (var i=0;i<splitRules.length;i++){
        if(checkValidRule(splitRules[i])!=null){
        count+=1;
        }
    }
    if(count == splitRules.length){
        return 1;
    }else{
        return 0;
    }
}

export const convertElements = elements =>{
    var array = {
        nodes: [],
        edges:[],
    }
    for (var k in elements) {
        var element = elements[k];
        //console.log(element);
        if(!element.isOutput){
            var newNodes = createNeuron(element.id, element.position.x,element.position.y,element.rules, element.spikes, element.delay);
            array.nodes.push(newNodes[0])
            array.nodes.push(newNodes[1])
            array.nodes.push(newNodes[2])
            array.nodes.push(newNodes[3])
            
        }else{
            var newOutputNode = createOutputNeuron(element.id, element.position.x,element.position.y, element.id, element.bitstring, 0);
            array.nodes.push(newOutputNode[0])
            array.nodes.push(newOutputNode[1])
            array.nodes.push(newOutputNode[2])
        } 
        if(element.out){
            for (var i=0; i< element.out.length; i++){
                var newEdges = createEdge(element.id, element.out[i]);
                array.edges.push(newEdges);
            }
        }  
        
        
    }
    return array;
}
