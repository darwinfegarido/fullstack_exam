const styles = {
  counterName: {
    fontWeight: 700,
    textAlign: "center",
  }
}

function CounterName({ name, color, fontSize }) {
  return (
    <div style={{...styles.counterName, color: color ? color : "#000", fontSize: fontSize ? fontSize: "35px" }}>
      {name}
    </div>
  );
}

export default CounterName;
