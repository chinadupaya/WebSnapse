import produce from 'immer'
export function parseRule(rule){
    const re = /(a+)(\+*\**)\/(a+)->(a+);([0-9]+)/
    
    const res = re.exec(rule)
    if (res) {
      const [, requires, symbol, consumes, produces, delayStr] = res
      const delay = parseInt(delayStr, 10)
      return[requires.length, symbol, consumes.length, produces.length, delay];
    }
  
    return false
}
export function canUseRule(requires, symbol, spikes){
    if(symbol && symbol == '+'){
        if (spikes > requires){
            return true
        }
    }
    if(symbol && symbol == '*'){
        if (spikes >= requires){
            return true
        }
    }
    if(spikes==requires){
        return true;
    }
    return false;
}
export function step(neurons){
    const newStates = produce(neurons, draft =>{
        const spikeAdds = {}
        const outputTracker = [];
        for (var k in draft){
            var neuron = draft[k];
            //states[k] = states[k] || initializeState(neuron);
            //var state = states[k];
            //choose rule to follow if not working on a rule currently
            if(!neuron.currentRule && !neuron.isOutput){
                //pick a rule
                var rules = neuron.rules.split(' ');
                for (var i=0;i<rules.length;i++){
                    var [requires, symbol, consumes, produces, delay] = parseRule(rules[i]);
                    if(canUseRule(requires,symbol,neuron.spikes)){
                        console.log("Use rule",rules[i]);
                        //TO DO accept non-determinism
                        draft[neuron.id].currentRule = rules[i];
                        draft[neuron.id].delay = delay;
                    }
                } 
            }else if(neuron.currentRule){
                if(neuron.delay > 0){
                    let newDelay = neuron.delay.valueOf();
                    newDelay--;
                    draft[neuron.id].delay = newDelay;
                }
                if(neuron.delay == 0){
                    //consume spikes
                    var [requires, symbol, consumes, produces, delay] = parseRule(neuron.currentRule);
                    let newSpikes = neuron.spikes.valueOf();
                    newSpikes-=consumes;
                    draft[neuron.id].spikes = newSpikes;
                    //send spikes
                    const neuronOutKeys = neuron.out;
                    for (let k of neuronOutKeys) {
                    spikeAdds[k] =
                        k in spikeAdds ? spikeAdds[k] + produces : produces
                    }
                    //resolve rule
                    delete draft[neuron.id].currentRule;
                    //neuron.spikes
                    /* if(neuron.out && neuron.out.length > 0){
                        console.log("send spikes!");
                        //send spikes
                    } */
                } 
            } else if(neuron.isOutput){
                outputTracker.push(neuron.id);
            }
            
        }
        for (const k in spikeAdds) {
            //states[k].spikes -= spikeAdds[k]
            let newSpikes = draft[k].spikes.valueOf();
            newSpikes+=spikeAdds[k];
            draft[k].spikes = newSpikes;
            if(draft[k].isOutput){
                var newString = `${draft[k].bitstring}${'1'}`
                draft[k].bitstring=newString;
            }
        }
        console.log(outputTracker);
        //if nothing was passed to an output node, append '0'
        for (var k=0;k<outputTracker.length; k++){
            console.log(outputTracker[k])
            if(!spikeAdds[outputTracker[k]]){
                console.log(draft[outputTracker[k]].bitstring);
                //var string_copy = (' ' + original_string).slice(1);
                var newString = `${draft[outputTracker[k]].bitstring}${'0'}`
                draft[outputTracker[k]].bitstring=newString;
            }
        }
    })

    return newStates;
    
}
export function initialize(neurons) {
    const states = {}
    for (const k in neurons) {
      const neuron = neurons[k]
      states[k] = initializeState(neuron)
    }
    return states
}
export function initializeState(neuron) {
    return {
      spikes: neuron.spikes,
      delay: 0
    }
  }