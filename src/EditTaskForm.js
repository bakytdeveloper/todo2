import {useEffect, useState} from "react";
import {collection, addDoc, Timestamp, doc, getDoc, updateDoc} from "firebase/firestore";
import  db  from "./connectDb"

function EditTaskForm(props){

    const [title, setTitle] = useState("");

  useEffect(() => {
      if(!props.id) return;
      getDoc(doc(db, "tasks", props.id)).then(doc => {
          setTitle(doc.data().title);
      });
  }, [props.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDoc(doc(db, "tasks", props.id),{title})
            .then(r => console.log(r))
            .catch(err => console.log(err));
        props.onCancel();
        setTitle("");
    }
    const handleCancel = () => {
        props.onCancel();
        setTitle("");
    }

    if(!title || !props.id) return null;

    return (
        <form className="input-group mb-3">
            <input type="text" placeholder="Введите текст"
                   value={title}
                   onChange={e => setTitle(e.target.value)}
                   className="form-control list-group-item list-group-item-success"
            />
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button type="submit" onClick={handleCancel} className="btn btn-danger">Cancel</button>

        </form>
    )
}
export default EditTaskForm;