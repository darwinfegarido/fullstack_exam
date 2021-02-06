import { useState, useEffect } from "react";
import { Spinner, Row, Col, Button } from 'react-bootstrap';
import CounterList from "../components/CounterList";
import CounterItem from "../components/CounterItem";
import CounterName from "../components/CounterName";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { url } from "../config.js";
import { useSelector } from 'react-redux';

const styles = {
  counterItem: {
    textAlign: "center"
  },
  loading: {
    marginTop: "200px"
  }
}

function Body({ isBack, setBack }) {
  const [ isLoading, setLoading ] = useState(true)
  const [ counters, setCounters ] = useState();
  const isCounterPage = useSelector( state => state.isCounterPage )
  const item = useSelector( state => state.item )
  const [ count, setCount ] = useState();

  useEffect(() => {
    if(isLoading){
      fetch(url)
      .then(res => res.json())
      .then(result => {
        setCounters(result.data)
        if(isLoading) setBack(false)
        setLoading(false)

      })
    }
  }, [isLoading]);

  useEffect(() => {
    if(item) setCount(item.amount)
  }, [item])

  useEffect(() => {
    if(isBack) {
      setLoading(true)
    }
  }, [isBack])

  const updateItem = (countItem) => {
    const option = {
      method: "post",
      body: JSON.stringify({
        id: item.id,
        amount: countItem,
        name: item.name
       })
    }
    fetch(url + "update", option)
      .then(res => res.json())
  }

  const increment = () => {
    setCount(prevState => prevState + 1)
    updateItem(count + 1)
  }

  const decrement = () => {
    setCount(prevState => prevState - 1)
    updateItem(count - 1)
  }

  return(
    <>
    {
      !isCounterPage ?
      <Row>
        <Col xl={12}>
          <CounterList setLoading={setLoading} />
        </Col>
        <Col xl={12} style={styles.counterItem}>
          {
            isLoading ?
            (<div  style={styles.loading}>
                <Spinner animation="grow" />{" "}
                <Spinner animation="grow" />{" "}
                <Spinner animation="grow" />
              </div>) :
            (<CounterItem counters={counters} setLoading={setLoading}/>)
          }
        </Col>
      </Row> :
      <Row >
        <Col xl={12}>
          <CounterName name={count} fontSize="300px" />
        </Col>
        <Col xl={6} style={styles.counterItem}>
          <Button variant="secondary" onClick={decrement}><FontAwesomeIcon icon={faMinus} size="6x"/></Button>{" "}
        </Col>
        <Col xl={6} style={styles.counterItem}>
          <Button variant="secondary" onClick={increment}><FontAwesomeIcon icon={faPlus} size="6x"/></Button>
        </Col>
      </Row>
    }


    </>
  );
}


export default Body;
