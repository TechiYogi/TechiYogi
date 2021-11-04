import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    } from 'reactstrap';
import ShowReport from '../Report/ShowReport'

function EndSessionModal() {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    
    return (
        <div>
            <Button color="danger" onClick={toggle}>End Session</Button>
        <Modal isOpen={modal} toggle={toggle} className='endSession'>
            <ModalHeader toggle={toggle}>Your Report</ModalHeader>
            <ModalBody >
                <ShowReport/>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}

export default EndSessionModal
