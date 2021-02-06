
import CounterName from "../components/CounterName";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';

const styles = {
  header: {
    backgroundColor: "#181818",
    height: '60px'
  }
}


function Header({ setBack }) {
  const isCounterPage = useSelector( state => state.isCounterPage )
  const item = useSelector( state => state.item )
  const dispatch = useDispatch()
  const goBack = () => {
    setBack(true)
    dispatch({type: "TOGGLE"})
  }

  return (
      <Row style={styles.header}>
        {(isCounterPage) ?
          <>
            <Col lg md sm xs={{ order: "first" }}>
              <Button variant="default" onClick={goBack}><FontAwesomeIcon icon={faChevronLeft} size="3x" color="#fff"/></Button>
            </Col>
            <Col lg={11} md={11} sm={{ order: "last" }} xs={{ order: "last" }}>
              <CounterName name={item.name} color="#fff"/>
            </Col>
          </>: <Col></Col>}

      </Row>
  );
}

export default Header;
