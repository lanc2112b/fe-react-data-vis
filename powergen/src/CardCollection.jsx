import CountrySelector from "./CountrySelector";
import TimeNavigator from "./TimeNavigator";
import GenerationSection from './GenerationSection';
import { useState } from "react";


const CardCollection = () => {
  const [countryVal, setCountryVal] = useState(15);
  const [timeVal, setTimeVal] = useState('2023-03-01T00:00Z'); //2018-05-15T11:30Z

  const nextDay = shiftDay(timeVal, "add");
  const prevDay = shiftDay(timeVal, "subtract");

  //console.log(nextDay, prevDay);

  return (
    <main className="container">
      <CountrySelector countryVal={countryVal} setCountryVal={setCountryVal} />
      <TimeNavigator
        timeVal={timeVal}
        setTimeVal={setTimeVal}
        nextDay={nextDay}
        prevDay={prevDay}
      />
      <GenerationSection
        countryVal={countryVal}
        nextDay={nextDay}
        prevDay={prevDay}
        timeVal={timeVal}
      />
    </main>
  );
}

function shiftDay(currentDay, op) {
  const sdate = new Date(currentDay);
  if (op === "subtract") {
    sdate.setHours(sdate.getHours() - 24);
  }
  if (op === "add") {
    sdate.setHours(sdate.getHours() + 24);
  }
  return sdate.toISOString();
}

export default CardCollection;