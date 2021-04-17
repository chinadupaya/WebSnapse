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
            rules: transformRules(rules),
            label: ''//rules.replace(/ /g, "\n")
        },
        position: { x: x, y: y },
        classes: 'snapse-node__rules'
    },
    {
        data: {
            id: newId + '-spike',
            parent: newId,
            spike: `${(spike == 0) ? "λ" : spike}`,
            label: ''
        },
        position: { x: x, y: y - 50 },
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
        classes: 'snapse-node__bitstring',
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

export const transformRules = (rules) => {
    var splitRules = rules.split(" ");
    console.log(splitRules);
    var htmlString = '<p class="rules">';

    for (var i=0; i<splitRules.length; i++){
        //split the rule into the characters 
        console.log('it enters');
        var splitRule = splitRules[i].split('/').join(';').split('->').join(';').split(';')
        //splitRule[0] = required spikes
        var requiredSpikes = (splitRule[0].match(/a/g)|| []).length;
        console.log('requiredSpikes', requiredSpikes);
        if (requiredSpikes === 0){
            temp = htmlString.concat(`a<sup>λ</sup>`);
            htmlString = temp; 
        }else if(requiredSpikes === 1){
            temp = htmlString.concat('a');
            htmlString = temp; 
        }else{
            temp = htmlString.concat(`a<sup>${requiredSpikes}</sup>`);
            htmlString = temp; 
        }

        if ((splitRule[0].match(/\+/g)|| []).length > 0){
            temp = htmlString.concat('<sup>+</sup>');
            htmlString = temp; 
        }
        else if((splitRule[0].match(/\*/g)|| []).length > 0){
            temp = htmlString.concat('<sup>*</sup>');
            htmlString = temp; 
        }

        temp = htmlString.concat('/');
        htmlString = temp;
        //splitRule[1] = consumed spikes 
        var consumedSpikes = (splitRule[1].match(/a/g)|| []).length;
        var temp = "";
        
        if (consumedSpikes == 0){
            temp = htmlString.concat(`a<sup>λ</sup>`);
            htmlString = temp; 
        }else if(consumedSpikes == 1){
            temp = htmlString.concat('a');
            htmlString = temp; 
        }else{
            temp = htmlString.concat(`a<sup>${consumedSpikes}</sup>`);
            htmlString = temp; 
        }

        if ((splitRule[1].match(/\+/g)|| []).length > 0){
            temp = htmlString.concat('<sup>+</sup>');
            htmlString = temp; 
        }
        else if((splitRule[1].match(/\*/g)|| []).length > 0){
            temp = htmlString.concat('<sup>*</sup>');
            htmlString = temp; 
        }

        temp = htmlString.concat('→');
        htmlString = temp; 
        //splitRule[2] = sent spikes
        var sentSpikes = (splitRule[2].match(/a/g)|| []).length;

        if (sentSpikes == 0){
            temp = htmlString.concat(`a<sup>λ</sup>`);
            htmlString = temp; 
        }else if(sentSpikes == 1){
            temp = htmlString.concat('a');
            htmlString = temp; 
        }else{
            temp = htmlString.concat(`a<sup>${sentSpikes}</sup>`);
            htmlString = temp; 
        }

        if ((splitRule[2].match(/\+/g)|| []).length > 0){
            temp = htmlString.concat('<sup>+</sup>');
            htmlString = temp; 
        }
        else if((splitRule[2].match(/\*/g)|| []).length > 0){
            temp = htmlString.concat('<sup>*</sup>');
            htmlString = temp; 
        }

        //splitRule[3] = delay;
        temp = htmlString.concat(`;${splitRule[3]}`);
        htmlString = temp; 

        // check if last rule
        if(i < (splitRules.length-1)){
            temp = htmlString.concat('\n');
            htmlString = temp;
        }else{
            temp = htmlString.concat('</p>');
            htmlString = temp; 
        }
        console.log(htmlString);
        return htmlString;
    }
}
