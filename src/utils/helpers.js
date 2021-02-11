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
            parent: newId,
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
    }]