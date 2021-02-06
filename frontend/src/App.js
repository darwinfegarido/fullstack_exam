import Header from './views/Header';
import Body from "./views/Body";
import { Container } from "react-bootstrap";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [ isBack, setBack ] = useState(false);
  return (
    <Container fluid>
      <Header setBack={setBack}/>
      <Body isBack={isBack} setBack={setBack}/>
    </Container>
  );
}

export default App;
