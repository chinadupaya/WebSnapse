export const createNeuron = (newId, x,
    y,
    rules,
    spike,
    time) => [{
        data: {
            id: newId,
            label: `${(newId.includes('-'))? newId.substr(0, newId.indexOf('-')) : newId}`
        },
        position: { x: x, y: y },
        classes: 'snapse-node'
    },
    {
        data: {
            id: newId + '-rules',
            parent:newId,
            label: rules.replace(/ /g, "\n").replace(/->/g, "→")
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
        position: { x: x, y: y - 60 },
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
export const createOutputNeuron = (id,x,y,output,spike) => [
    {
        data: { rootId: id, id: `${id}`, label: `${(id.includes('-'))? id.substr(0, id.indexOf('-')) : id}`},
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
    const re = /(a+)(\+*\**)\/(a+)->(a+);([0-9]+)/
    const testRe = /(a+)(\(*a*\)*)(\+*\**)\/(a+)->(a+);([0-9]+)/
    const forgetRe=/(a+)(\+*\**)\/(a+)->(0);(0)/
    var result = testRe.exec(rule) || forgetRe.exec(rule);
    console.log(result);    
    return result;
}

export const createEdge = (src,dst,c) =>{
    return {
        data: {
          id: src + '-' + dst,
          source: src,
          target: dst
        },
        classes: c
      };
}

export const allRulesValid = (rules) => {
    var splitRules = rules.split(" ");
    var count = 0;
    for (var i=0;i<splitRules.length;i++){
        if(checkValidRule(splitRules[i])!=null){
            count+=1;
        }else{
            console.log("invalidRule", splitRules[i])
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
            var newOutputNode = createOutputNeuron(element.id, element.position.x,element.position.y, element.bitstring, 0);
            array.nodes.push(newOutputNode[0])
            array.nodes.push(newOutputNode[1])
            array.nodes.push(newOutputNode[2])
        } 
        if(element.out){
            for (var i=0; i< element.out.length; i++){
                if (element.delay<0) {
                    console.log(element.delay)
                    for (let out of element.out) {
                      var newEdge = createEdge(element.id, element.out[i],' edge--triggering');
                      array.edges.push(newEdge);
                    }
                }else{
                    var newEdges = createEdge(element.id, element.out[i],'');
                    array.edges.push(newEdges);
                }
            }
        }
    }
    return array;
}
