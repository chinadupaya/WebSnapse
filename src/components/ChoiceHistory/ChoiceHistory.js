import { Table, Modal } from "react-bootstrap"
import './ChoiceHistory.css';
const ChoiceHistory = ({time,showChoiceHistoryModal,handleCloseHoiceHistoryModal}) =>{
    var getLatestState = JSON.parse(localStorage.getItem(time-1+"sec"));
    var neuronIds = <td>There are no neurons</td>;
    if(getLatestState){
        neuronIds = Object.keys(getLatestState).map((neuron)=>(
            <th key={neuron}>{neuron}</th>)
        )
    }
    var neuronRows = [];
    
    for(var i = 0; i<time; i++){
        var neuronCells=[];
        neuronCells.push(TableCell(i));
        var state = JSON.parse(localStorage.getItem(i+"sec"));
        for(var k in state){
            if(state[k].chosenRule){
                neuronCells.push(TableCell(state[k].chosenRule.replace(/->/g, "→")));
            }else{
                neuronCells.push(TableCell("No applicable rule."));
            }
        }
        neuronRows.push(TableRow(neuronCells, i));
        neuronCells = []
    }
    return(
        <Modal show={showChoiceHistoryModal} 
        onHide={handleCloseHoiceHistoryModal} 
        className="custom-choice-history-modal"
        size="lg">
                <Table className="choicehistory" striped bordered hover data-testid="choice-history-table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            {neuronIds}
                        </tr>
                    </thead>
                    <tbody>
                        {neuronRows}
                    </tbody>
                </Table>
        </Modal>
    )
};

const TableCell = (content) =>{
    return(
        <td>
            {content}
        </td>
    )
};

const TableRow = (content,i)=>{
    return (
        <tr key={"time-"+i}>
            {content}
        </tr>
    )
}

export default ChoiceHistory;