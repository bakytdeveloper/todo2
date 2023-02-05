import db from "./connectDb";
import { collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {useEffect, useState} from "react";


function TaskList(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() =>{
        const taskColRef = query(collection(db, "tasks"), orderBy("created", "desc"));
        onSnapshot(taskColRef, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })

    },[]);

    const onDeleteTask = (id) => {
        deleteDoc(doc(db, "tasks", id))
            .then(r => console.log(r))
            .catch(err => console.log(err));
    }

    const onToggleDone = (id, newStatus) => {

        updateDoc(doc(db, "tasks", id),{completed: newStatus})
            .then(r => console.log(r))
            .catch(err => console.log(err));
    }

    return (
            <ul className="list-group">
                { tasks.map(task => (
                    <li key={task.id} className="list-group-item list-group-item-primary">
                     <div className="row">
                        <div className="col-8">
                            { task.completed ? <s>{task.title}</s> : task.title}
                        </div>
                         <div className="col-4">
                             <button onClick={() => onDeleteTask(task.id)} className="btn btn-danger">Delete</button>
                             <button onClick={() => onToggleDone(task.id, !task.completed)} className="btn btn-success">DONE</button>
                             <button onClick={() => props.onEdit(task.id)} className="btn btn-warning">EDIT</button>
                         </div>
                     </div>
                    </li>

                    ))}
            </ul>
    );
}

export default TaskList;
