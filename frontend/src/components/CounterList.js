import { Row, Col, Button } from 'react-bootstrap';
import CounterName from "./CounterName"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { url } from "../config.js";

const styles = {
  counterList: {
    paddingTop: "20px",
  }
}


function CounterList({ setLoading }) {
  const addCounter = () => {
      setLoading(true)
      fetch(url + "create", { method: "post" })
        .then(res => res.json())
        .then(result => setLoading(false))
  }

  return(
    <Row style={styles.counterList}>
      <Col lg md sm xs>
        <CounterName name="Counter lists" />
      </Col>
      <Col lg={3} md={3} sm={12} xs={12}>
        <Button variant="success" onClick={addCounter}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </Button>
      </Col>
    </Row>
  );
}


export default CounterList;
