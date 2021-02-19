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
                        //state.spikes-=consumes;
                        //console.log(state);
                    }else{
                        console.log("Cant use rule",rules[i]);
                    }
                } 

            }
            /* delete state.justResolvedRule;
            if(state.delay > 0){
                state.delay--;
            }
            if(state.delay == 0){
                if(neuron.out && neuron.out.length > 0){
                    //send spikes
                }
            } */
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