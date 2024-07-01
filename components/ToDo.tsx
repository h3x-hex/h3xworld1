import { firestore } from "config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ToDoType } from "types/types";


interface IProps {
    username: string,
    listName: string;
}

export default function ToDo ({username, listName}: IProps) {

    const [taskList, setTaskList] = useState<ToDoType[]>([]);

    var todoTask: ToDoType[] = [];

    useEffect(() => {
        async function getData(username: string, listName: string) {
          
          const listRef = doc(firestore, `ToDo/${username}/${listName}`);
          const listDoc = await getDoc(listRef);
          if (listDoc.exists()) 
          { 
            console.log(listDoc.data());
          } else 
          {
            console.log("");
          }
        }
          getData(username, listName);
      }, []);


}