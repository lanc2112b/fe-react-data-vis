import GenGraphDisplay from "./GenGraphDisplay";
import TypeNavigator from "./TypeNavigator";
import Loader from "./Loader";
import { useEffect, useState } from "react";

/** API
 * https://api.carbonintensity.org.uk/
 * https://api.carbonintensity.org.uk/regional/intensity/2018-05-15T12:00Z/2018-05-16T12:00Z/regionid/1
 */

const GenerationSection = ({ countryVal, prevDay, timeVal }) => {
  const [typeIndex, setTypeIndex] = useState(9);

  const [genData, setGenData] = useState(null); // need to replace starter data

  const apiStr = `https://api.carbonintensity.org.uk/regional/intensity/${prevDay}/${timeVal}/regionid/${countryVal}`;

  useEffect(() => {

    fetch(apiStr)
      .then((response) => response.json())
      .then((data) => {
        const useful = aggregateData(data.data.data); // 48 points of 30min data aggregated into the avg over 24 hours :)
        setGenData([...useful, { fuel: "all" }]); // spread array, then attach all option
      });
  }, [genData, apiStr]); //countryVal, timeVal, prevDay,

  if (!genData) {
    return <Loader />;
  }

  return (
    <section className="type-nav">
      <TypeNavigator
        typeIndex={typeIndex}
        setTypeIndex={setTypeIndex}
        generationmix={genData}
      />
      <div className="graph">
        <GenGraphDisplay generationmix={genData} typeIndex={typeIndex} />
      </div>
    </section>
  );
};

/* function sleepFor(sleepDuration) {
  var now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    // Do nothing 
  }
} */


function aggregateData(dataArr) {

  const arrMain = [
    { fuel: "biomass", perc: 0 },
    { fuel: "coal", perc: 0 },
    { fuel: "imports", perc: 0 },
    { fuel: "gas", perc: 0 },
    { fuel: "nuclear", perc: 0 },
    { fuel: "other", perc: 0 },
    { fuel: "hydro", perc: 0 },
    { fuel: "solar", perc: 0 },
    { fuel: "wind", perc: 0 },
  ];

  const newArr = dataArr.reduce((acc, element) => {

    const genArr = element.generationmix;

    for (let i = 0; i < genArr.length; i++) {
      acc[i].perc += genArr[i].perc;
    }

    return acc;

  }, arrMain);
  
  return newArr.map((element) => {
    element.perc = element.perc / 48;
    return element;
  }) 

}



export default GenerationSection;
