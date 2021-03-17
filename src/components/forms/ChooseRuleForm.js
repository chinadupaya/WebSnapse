import { Button, Form, Modal } from 'react-bootstrap';

const ChooseRuleForm = ({showChooseRuleModal, handleCloseChooseRuleModal,rules}) => {
    return (
        <Modal show={showChooseRuleModal} onHide={handleCloseChooseRuleModal}>
            <Modal.Header closeButton>
                <Modal.Title>Choose Rule Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            CHOOSE RULE FORM MODAL
        </Modal.Body>
        </Modal>
    )
}
export default ChooseRuleForm;