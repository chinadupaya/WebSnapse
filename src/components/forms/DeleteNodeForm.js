import { Button, Form, Modal } from 'react-bootstrap';
import { useReducer, useState } from 'react';
import { allRulesValid } from "../../utils/helpers";

const DeleteNodeForm = ({ showDeleteModal, handleCloseDeleteModal, handleDeleteNode, handleError, neurons }) => {
    const [neuronId, setNeuronId] = useState(Object.keys(neurons));
    const handleClose = () => {
        handleCloseDeleteModal();
    };

    console.log("it's here", neurons);
    console.log("neuron[0]",Object.keys(neurons));
    
    let neuronOptions = Object.keys(neurons).map((neuron)=>(
        <option value={neuron} key={neuron}>{neuron}</option>)
    )

    let defaultNeuron = Object.keys(neurons)[0];
    console.log("defaultNeuron", defaultNeuron);

    function handleSelectChange(event){
        console.log("Event.target.value", event.target.value)
        setNeuronId(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(neurons);
        if(neuronId!==''){
            
            handleClose();
                setTimeout(() => {
                    setNeuronId('');
                }, 3000);
                handleDeleteNode(neuronId);
        }else{
            handleClose();
                setTimeout(() => {
                    setNeuronId('');
                }, 3000);
                handleDeleteNode(defaultNeuron);
            //handleError(`Please input a neuron id ${neuronId} none`);
            //handleClose();
        }
    }

    return (
        <Modal show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Node</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Select node to delete</Form.Label>
                        <Form.Control as="select" defaultValue={defaultNeuron} value={neuronId} onChange={handleSelectChange}>
                            {neuronOptions}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button> {' '}
                    <Button type="submit" variant="danger">
                        Delete neuron
            </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default DeleteNodeForm;