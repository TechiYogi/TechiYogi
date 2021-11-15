import react, { useState } from 'react'
import db from "../../firebase";
import { getFirestore, getDocs } from 'firebase/firestore';
import firebase from '../../firebase';
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import ReactConfirmAlert from "react-confirm-alert";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
//import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button';
 
function ShowSchedule() {

  const [result, setresult] = useState({})

  const Fetchdoc = async () => {
    const docRef = doc(db, "Schedule", localStorage.getItem('email'));
    const docSnap = await getDoc(docRef);
    setresult(docSnap.data()[localStorage.getItem('email')])
  }

  Fetchdoc();

  const ScheduleTable = () => {
    let ourList = []
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for (let i = 0; i < 7; i++) {
      let times = result[weekDays[i]]
      if (times) {
        for (let time in times) {
          let asanas = times[time]
          let temp = []
          temp.push(weekDays[i])
          temp.push(time)
          temp.push(asanas)
          ourList.push(temp)
        }
      }

    }

    for (let i = 0; i < ourList.length; i++) {
      let arr = ourList[i][2]
      let asanas_temp = []
      for (let j = 0; j < arr.length; j++) {
        asanas_temp.push(arr[j] + " ")
      }
      ourList[i][2] = asanas_temp
    }
    let popOverOpen = false
    const toggle = () => {
      popOverOpen = true
    }
    return ourList.map((schd) => {

      return (

        <tr>

          <td>{schd[0]}</td>
          <td>{schd[1]}</td>
          <td>

            <div style={{
              display: 'block',
              width: 500,
              padding: 30
            }}>
              <OverlayTrigger
                placement="bottom"
                trigger="click"
                overlay={(
                  <Popover>
                    {/* <Popover.Title as="h3">
                      GeeksforGeeks
                    </Popover.Title>
                    <Popover.Content> */}
                      {schd[2]}
                    {/* </Popover.Content> */}
                  </Popover>
                )}>
                <Button variant="success">
                  Click here
                </Button>
              </OverlayTrigger>
            </div>

          </td>
        </tr>

      )

    })

  }
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th style={{width:400}}>Day</th>
            <th style={{width:600}}>Time</th>
            <th style={{width:400}}>Asanas</th>
          </tr>
        </thead>
        <tbody>{ScheduleTable()}</tbody>
      </Table>
    </div>
  );

}
export default ShowSchedule