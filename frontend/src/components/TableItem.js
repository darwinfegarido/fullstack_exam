import { useState } from "react";
import { Button, FormControl } from 'react-bootstrap';
import CounterName from "./CounterName"
import { faEllipsisH, faPen, faTrashAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { url } from "../config.js";
import { useDispatch } from 'react-redux';


function TableItem ({ item, setLoading}) {

    const [ isEditing, setEditing ] = useState(false)
    const [ name, setName ] = useState(item.name)
    const dispatch = useDispatch()

    const deleteItem = () => {
      setLoading(true)
      const option = {
        method: "post",
        body: JSON.stringify({ id: item.id })
      }
      fetch(url + "delete", option)
        .then(res => res.json())
        .then(result => setLoading(false))
    }

    const updateItem = () => {
      setLoading(true)
      setEditing(false)
      const option = {
        method: "post",
        body: JSON.stringify({
          id: item.id,
          amount: item.amount,
          name: name
         })
      }
      fetch(url + "update", option)
        .then(res => res.json())
        .then(result => setLoading(false))
    }


    return (
      <tr >
        <td><CounterName name={item.id} fontSize="25px"/></td>
        <td>{
          isEditing ?
          <FormControl onChange={e => setName(e.target.value)} value={name}/> :
          <CounterName name={item.name} fontSize="25px"/>
          }</td>
        <td><CounterName name={item.amount} fontSize="25px"/></td>
        <td>
        {
          !isEditing ?
          <>
          <Button variant="info" onClick={() => setEditing(true)}><FontAwesomeIcon icon={faPen} size="1x"/></Button>{" "}
          <Button variant="danger" onClick={deleteItem} ><FontAwesomeIcon icon={faTrashAlt} size="1x"/></Button>{" "}
          <Button variant="secondary" onClick={() => dispatch({type:"TOGGLE", payload: item})}><FontAwesomeIcon icon={faEllipsisH} size="1x"/></Button>
          </> :
          <>
          <Button variant="danger" onClick={() => setEditing(false)}><FontAwesomeIcon icon={faTimes} size="1x"/></Button>{" "}
          <Button variant="success" onClick={updateItem}><FontAwesomeIcon icon={faCheck} size="1x"/></Button>
          </>
        }
        </td>
      </tr>
    )
}


export default TableItem;
