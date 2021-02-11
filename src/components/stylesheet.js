const styles = [
    {
        selector: '.snapse-node, .snapse-output',
        style: {
            'background-opacity': '0',
            'padding-top': '0',
            'border-width': 0,
            'text-halign': 'left',
            'text-valign': 'top',
            color: 'black',
            content: 'data(label)'
        }
    },
    {
        selector: '.snapse-node__rules, .snapse-node__output',
        style: {
            'background-color': 'white',
            'border-width': 1,
            events: 'no',
            'text-wrap': 'wrap',
            'text-halign': 'center',
            'text-valign': 'center',
            content: 'data(label)',
            height: 150,
            shape: 'roundrectangle',
            width: 100
        }
    },
    {
        selector: '.snapse-node__time, .snapse-node__spike',
        style: {
            'background-opacity': '0',
            'text-halign': 'center',
            'text-valign': 'center',
            content: 'data(label)',
            events: 'no',
            height: 15,
            shape: 'roundrectangle',
            width: 50
        }
    },
    /*     {
            selector: 'node',
            style: {
                'background-opacity': '0',
                'padding-top': '0',
                'text-halign': 'left',
                'text-valign': 'top',
                color: 'black',
                content: 'data(label)',
                'border-width': 1,
                events: 'no',
                'text-wrap': 'wrap',
                shape: 'roundrectangle'
            }
        }, */
    {
        selector: 'edge',
        style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'text-background-color': 'white',
            'text-background-shape': 'rectangle',
            width: 1
        }
    },
]
export default styles;
