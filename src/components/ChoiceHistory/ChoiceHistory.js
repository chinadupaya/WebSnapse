import { Table, Modal } from "react-bootstrap"
const ChoiceHistory = ({time,showChoiceHistoryModal,handleCloseHoiceHistoryModal}) =>{
    var getLatestState = JSON.parse(localStorage.getItem(time-1+"sec"));
    var neuronIds = "There are no neurons";
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
                neuronCells.push(TableCell(state[k].chosenRule));
            }else{
                neuronCells.push(TableCell("No chosen rule"));
            }
        }
        neuronRows.push(TableRow(neuronCells));
        neuronCells = []
    }
    return(
        <Modal show={showChoiceHistoryModal} onHide={handleCloseHoiceHistoryModal}>
            <div>
                <Table striped bordered hover>
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
            </div>
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

const TableRow = (content)=>{
    return (
        <tr>
            {content}
        </tr>
    )
}

export default ChoiceHistory;