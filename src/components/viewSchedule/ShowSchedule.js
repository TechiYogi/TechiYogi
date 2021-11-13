import react,{useState} from 'react'
import db from "../../firebase";
import { getFirestore, getDocs } from 'firebase/firestore';
import firebase from '../../firebase';
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import ReactConfirmAlert from "react-confirm-alert";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
  } from "reactstrap";


const Fetchdoc = async () => {
  const docRef = doc(db, "Schedule", localStorage.getItem('email'));
  const docSnap = await getDoc(docRef);
  var result =  docSnap.data()[localStorage.getItem('email')]
  let ourList=[[]]
  for (let day in result) {
    let times = result[day]
    for (let time in times) {
        let asanas = times[time]
        let temp=[]
        temp.push(day)
        temp.push(time)
        temp.push(asanas)
        ourList.push(temp)
    }
  }
return ourList

 
  
}

  const assgnfunc = async (list,result) => {
      list=result
  }

  const ScheudleTable =  () => {
   // const [list, setList] = useState([]);
      let ourList = Fetchdoc()
      let list=[[]]
      ourList.then(function(results){
        for (let result in results){
          let temp=[]
          for (let vari in result){
            temp.push(vari)
          }
          console.log(temp)
          list.push(temp)
        }
      })
      console.log(list)
     // list.filter(x=>x.length!=0)
     // console.log(list)
    // var data = Fetchdoc()
    // let ourList = [[]]
    // data.then(function(result) {
    //     for (let day in result) {
    //         let times = result[day]
    //         for (let time in times) {
    //             let asanas = times[time]
    //             let temp=[]
    //             temp.push(day)
    //             temp.push(time)
    //             temp.push(asanas)
    //             ourList.push(temp)
    //         }
    //       }
          
    //  })
     //console.log(ourList)
     
    // list.map((vr)=>{
    //     console.log(vr)            
    // })
    // console.log(ourList)
   // return ourList.map((schd) => {
       // console.log(schd)
      return ( <tr>
        <td>Monday</td>
        <td>6:00</td>
        <td>{['cobra','tree']}</td>
        </tr>)


   // })
}
function ShowSchedule (){
   
    
        return (
          <div>
            <Table hover>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Asanas</th>
                </tr>
              </thead>
              <tbody>{ScheudleTable()}</tbody>
            </Table>
          </div>
        );
      
}
export default ShowSchedule