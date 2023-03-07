import GenGraphDisplay from "./GenGraphDisplay";
import TypeNavigator from "./TypeNavigator";
import { useEffect, useState } from "react";

const exampleData = {
  generationmix: [
    {
      fuel: "biomass",
      perc: 1,
    },
    {
      fuel: "coal",
      perc: 0,
    },
    {
      fuel: "imports",
      perc: 0.4,
    },
    {
      fuel: "gas",
      perc: 18.2,
    },
    {
      fuel: "nuclear",
      perc: 36.2,
    },
    {
      fuel: "other",
      perc: 0,
    },
    {
      fuel: "hydro",
      perc: 8.7,
    },
    {
      fuel: "solar",
      perc: 3.5,
    },
    {
      fuel: "wind",
      perc: 32,
    },
  ],
};

/** API
 * https://api.carbonintensity.org.uk/
 * https://api.carbonintensity.org.uk/regional/intensity/2018-05-15T12:00Z/2018-05-16T12:00Z/regionid/1
 */



const { generationmix } = exampleData;

//console.log(generationmix, 'genMix');

const GenerationSection = ({ countryVal, nextDay, prevDay, timeVal }) => {
  //console.log(countryVal);

  const [typeIndex, setTypeIndex] = useState(0);

  const [genData, setGenData] = useState(generationmix);

  useEffect(() => {
    const apiStr = `https://api.carbonintensity.org.uk/regional/intensity/${prevDay}/${timeVal}/regionid/${countryVal}`;

    fetch(apiStr)
      .then((response) => response.json())
      .then((data) => {
        const useful = aggregateData(data.data.data); // 48 points of 30min data aggregated into the avg over 24 hours :)
        setGenData([...useful]);
      });
  }, [countryVal, timeVal, prevDay]);
  //console.log(genData, "extracted gen mix");
  return (
    <section className="type-nav">
      <TypeNavigator
        typeIndex={typeIndex}
        setTypeIndex={setTypeIndex}
        generationmix={generationmix}
      />
      <div className="graph">
        <GenGraphDisplay generationmix={genData} typeIndex={typeIndex} />
      </div>
    </section>
  );
};

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
