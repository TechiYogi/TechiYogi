import db from "../../firebase";
import { getFirestore, getDocs } from 'firebase/firestore';
import { collection, addDoc, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import firebase from '../../firebase';

const report = {
    "chair": [[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6], 0],
    "cobra": [[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6, 3, 4], 0],
    "dog": [[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6, 5, 4, 1, 2], 0],
    "tree": [[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6, 3, 6, 5, 4, 1, 3], 0],
    "warrior": [[1, 2, 4, 3, 5, 6, 2, 3, 1, 5, 3, 4, 2, 5, 6, 4, 6, 3, 4, 5, 6, 1, 7, 6, 2], 0]
}
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const now = new Date();
var currDay = days[now.getDay()];
for (let rep in report) {
    report[rep] = JSON.stringify(report[rep])
}
const hour = now.getHours()
const mint = now.getMinutes()
const currTime = hour.toString() + ":" + mint.toString()
const c = localStorage.getItem('email')
const time = { [currTime]: report }
const day = { [currDay]: time }

const func = async () => {

    const docRef = doc(db, "Report", c);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let count = 0;
        let data = docSnap.data()[c]
        console.log(data)
        for (let i = 0; i < 7; i++) {
            let vr = data[days[i]]

            if (vr) {
                count = count + Object.keys(vr).length
            }



        }

        if (count == 14) {
            let rep = data[currDay]
            delete rep[Object.keys(rep)[0]];
        }

        if (data[currDay]) {
            let var2 = data[currDay]
            var2[currTime] = report
            data[currDay]=var2
        }
        else {
            data[currDay] = time
        }
        const d = {
            [c]: data
        }
        setDoc(docRef, d)
    }
    else {
        await setDoc(doc(db, "Report", c), {
            [c]: day
        });
    }
    
}
func()