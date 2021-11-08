import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    } from 'reactstrap';
import ShowReport from '../Report/ShowReport'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function EndSessionModal() {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleEnd = () => {

        confirmAlert({
            title: 'This will End the Session and generate the report for Aasan(s) performed till now!',
            message: 'Do you want to exit?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    // alert("Bye bye!");
                    toggle();
                }
              },
              {
                label: 'No',
                onClick: () =>{
                    // alert("Great! you should not compromise with your health!")
                }
              }
            ]
          })

    };
    
    return (
        <div>
            <Button color="danger" onClick={handleEnd}>End Session</Button>
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
