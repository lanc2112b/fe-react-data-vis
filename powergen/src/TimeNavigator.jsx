const TimeNavigator = ({ timeVal, setTimeVal, nextDay, prevDay}) => {
  
  const buttonHandler = (event) => {

    let setVal = "2023-03-01T00:00Z";
    
    setVal = event.target.value; // do some validation

    setTimeVal(setVal);
  }
  
  return (
    <section className="time-nav">
      <button className="prev" value={prevDay} onClick={buttonHandler}>
        {prevDay.substring(0, 10)}
      </button>
      <p>{timeVal.substring(0, 10)}</p>
      <button className="next" value={nextDay} onClick={buttonHandler}>
        {nextDay.substring(0, 10)}
      </button>
    </section>
  );
};

export default TimeNavigator;