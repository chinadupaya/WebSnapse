import produce from 'immer'
export function parseRule(rule){
    const re = /(a+)(\+*\**)\/(a+)->(a+);([0-9]+)/
    const forgetRe=/(a+)(\+*\**)\/(a+)->(0);(0)/
    const res = re.exec(rule)
    const forgetRes = forgetRe.exec(rule)
    if (res) {
      const [, requires, symbol, consumes, produces, delayStr] = res
      const delay = parseInt(delayStr, 10)
      return[requires.length, symbol, consumes.length, produces.length, delay];
    }else if(forgetRes){
        const [, requires,symbol,consumes, produces, delayStr] = forgetRes;
        return [requires.length, symbol, consumes.length, 0, 0];
    }
    return false
}
export function canUseRule(requires, symbol, spikes){
    if(symbol && symbol == '+'){
        if (spikes >= requires){
            return true
        }
    }
    else if(symbol && symbol == '*'){
        if (spikes >= requires-1){
            return true
        }
    }
    else if(spikes==requires){
        return true;
    }
    return false;
}
export function step(neurons,time,isRandom, setShowChooseRuleModal){
    const newStates = produce(neurons, draft =>{
        const spikeAdds = {}
        const outputTracker = [];
        for (var k in draft){
            var neuron = draft[k];
            //choose rule to follow if not working on a rule currently
            if(!neuron.currentRule && !neuron.isOutput){
                //pick a rule
                var rules = neuron.rules.split(' ');
                var validRules=[];
                for (var i=0;i<rules.length;i++){
                    var [requires, symbol, consumes, produces, delay] = parseRule(rules[i]);
                    if(canUseRule(requires,symbol,neuron.spikes)){
                        validRules.push(rules[i]);
                    }
                } 
                var indexToUse = 0
                if(validRules.length == 1){
                    draft[neuron.id].currentRule = validRules[0];
                    var [requires, symbol, consumes, produces, delay] = parseRule(validRules[0]);
                    draft[neuron.id].delay = delay
                }else if(isRandom == true && validRules.length > 1){
                    var randomIndex = Math.floor(Math.random() * (validRules.length)) 
                    var [requires, symbol, consumes, produces, delay] = parseRule(validRules[randomIndex]);
                    draft[neuron.id].currentRule = validRules[randomIndex];
                    draft[neuron.id].delay = delay
                }else if(isRandom == false && validRules.length > 1){ 
                    console.log(validRules);
                    setShowChooseRuleModal(true);
                }
                //change to if(isRandom)

            }
            //work on the rule
            if(neuron.currentRule){
                if(neuron.delay >= 0){
                    let newDelay = neuron.delay.valueOf();
                    newDelay--;
                    draft[neuron.id].delay = newDelay;
                }
                if(neuron.delay < 0){
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
                } 
            } else if(neuron.isOutput){
                outputTracker.push(neuron.id);
                if (!(k in spikeAdds)) {
                    spikeAdds[k] = 0
                  }
            }
            
        }
        for (const k in spikeAdds) {
            //states[k].spikes -= spikeAdds[k]
            let newSpikes = draft[k].spikes.valueOf();
            newSpikes+=spikeAdds[k];
            draft[k].spikes = newSpikes;
            if(draft[k].isOutput){
                var newString = `${draft[k].bitstring}${(spikeAdds[k] || '0')}`
                draft[k].bitstring=newString;
            }
        }

    })
    localStorage.setItem(time+'sec',JSON.stringify(newStates));
    return newStates;
    
}

export function backStep(time){
    console.log("back step automata");
    var oldState = JSON.parse(localStorage.getItem(time+'sec'));
    return oldState;
    
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