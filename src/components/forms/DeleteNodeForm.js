import { Button, Form, Modal } from 'react-bootstrap';
import { useReducer, useState } from 'react';
import { allRulesValid } from "../../utils/helpers";

const DeleteNodeForm = ({ showDeleteModal, handleCloseDeleteModal, handleDeleteNode, handleError, neurons }) => {
    const [neuronId, setNeuronId] = useState(Object.keys(neurons)[0]);
    const handleClose = () => {
        handleCloseDeleteModal();
    };
    
    let neuronOptions = Object.keys(neurons).map((neuron)=>(
        <option value={neuron} key={neuron}>{neuron}</option>)
    )
    function handleSelectChange(event){
        setNeuronId(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        if(neuronId!==''){
            
            handleClose();
                setTimeout(() => {
                    setNeuronId('');
                }, 3000);
                handleDeleteNode(neuronId);
        }else{
            handleError('Please input a neuron id');
            handleClose();
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
                        <Form.Control as="select" value={neuronId} onChange={handleSelectChange}>
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