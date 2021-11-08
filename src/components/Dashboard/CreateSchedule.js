import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input, FormText, Col
} from 'reactstrap';
import db from "../../firebase";
import { getFirestore, getDocs } from 'firebase/firestore';
import { collection, addDoc,doc,getDoc,updateDoc } from "firebase/firestore";
import { query, where} from "firebase/firestore";
import firebase from '../../firebase';

const CreateSchedule = (props) => { 
//const db = firebase.firestore();
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
    const saveAnswer = async (event) => {
        event.preventDefault();
    
        const elementsArray = [...event.target.elements];
        
    
        const formData = elementsArray.reduce((accumulator, currentValue) => {
          if (currentValue.id) {
            accumulator[currentValue.id] = currentValue.value;
          }
    
          return accumulator;
        }, {});

        const values = [...elementsArray[2].selectedOptions].map(opt => opt.value);
        formData.selectAasan=values;
        var email = new Map();
        var day = new Map();
        var time = new Map();
        time.set(formData.selectTime,formData.selectAasan);
        day.set(formData.selectDay,Object.fromEntries(time));
        email.set(localStorage.getItem('email'),Object.fromEntries(day));
       
        //const doccRef =  addDoc(collection(db,"schedule"),Object.fromEntries(email));

        const querySnapshot = await getDocs(collection(db, "schedule"));
        querySnapshot.forEach((doc) => {
          
         
          var data = doc.data();
          
          const map = new Map(Object.entries(data));
          console.log(map);
        
          
          
          if(map.has(localStorage.getItem('email'))){
              const map2 = new Map(Object.entries(map.values()));
              //console.log(map2);
            //   map2.set(formData.selectDay,Object.fromEntries(time));
            //   map.set(localStorage.getItem('email'),Object.fromEntries(map2));
              //console.log(map);
              
              //const doccRef =  addDoc(collection(db,"schedule"),Object.fromEntries(map));
              //const map2 = new Map(Object.entries(map.values()));
              //console.log(map2);
          }
        });
      //  const doccRef =  addDoc(collection(db,"schedule"),Object.fromEntries(email));


      
          
        
        
       
      };

    

    return (

        <div>
        <Button color="info" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Create Schedule</ModalHeader>
            <ModalBody >
                <Form onSubmit = {saveAnswer}>
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
