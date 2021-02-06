import { Table } from 'react-bootstrap';
import TableItem from "./TableItem"

const styles = {
  table: {
    marginTop: "50px",
    textAlign: "center",
    fontSize: "25px"
  }
}

function CounterItem({ counters, setLoading }) {
  return(
    <Table responsive="md" style={styles.table}>
      <thead>
        <tr>
          <th>#</th>
          <th>Counter Name</th>
          <th>Counts</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
          counters.map((item) => <TableItem item={item} key={item.id} setLoading={setLoading}/>)
      }
      </tbody>
    </Table>
  );
}


export default CounterItem;
