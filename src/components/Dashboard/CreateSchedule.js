import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input, FormText, Col
} from 'reactstrap';

const CreateSchedule = (props) => {

    const {
        buttonLabel = 'Create Schedule',
        className,
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        yogaPose = ['chair', 'cobra', 'dog', 'tree', 'warrier']
      } = props;
      
    const createOptions = (arr) => {
        return(
            arr.map( (day) => {
                return(
                    <option>{day}</option>
                )
            } )
        )
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
        <Button color="info" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Create Schedule</ModalHeader>
            <ModalBody >
                <Form>
                    <FormGroup row>
                        <Label for="selectDay"sm={3} >Select Day/s</Label>
                        <Col sm={6}>
                            <Input 
                                type='select'
                                name='Day'
                                id='selectDay'
                                // multiple
                                required
                            >
                            {createOptions(days)}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='selectTime' sm={3}>Select Time</Label>
                        <Col sm={6}>
                            <Input
                                type='time'
                                name='Time'
                                id='selectTime'
                                placeholder='time placeholder'
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for='selectAasan' >Select Aasan</Label>
                        <Input
                            type='select'
                            name='Aasan'
                            id='selectAasan'
                            multiple
                        >
                            {createOptions(yogaPose)}
                        </Input>
                    </FormGroup>

                    <Button block type='submit' color='primary'>Submit</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
            {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '} */}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}

export default CreateSchedule
