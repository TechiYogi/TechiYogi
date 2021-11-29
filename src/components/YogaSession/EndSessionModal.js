import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    } from 'reactstrap';
import ShowReport from '../Report/ShowReport'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import SaveReport from '../Report/SaveReport';

const EndSessionModal = (props) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const endSession = () => {
        let report = props.report
        for (let rep in report) {
            report[rep] = JSON.stringify(report[rep])
        }
        SaveReport(report);
        toggle();
    }

    const handleEnd = () => {

        props.changeTimerState(3);

        confirmAlert({
            title: 'This will End the Session and generate the report for Aasan(s) performed till now!',
            message: 'Do you want to exit?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    // alert("Bye bye!");
                    endSession()
                }
              },
              {
                label: 'No',
                onClick: () =>{
                    props.changeTimerState(1)
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
                <ShowReport  />
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}

export default EndSessionModal


