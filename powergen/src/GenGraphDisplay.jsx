import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function prepData(data) {
  const labels = [];
  const percs = [];
  data.forEach((element) => {
    //if (element.fuel !== 'all') {
      labels.push(element.fuel);
      percs.push(element.perc);
   // }
  });

  return [labels, percs];
}


function prepColors(data) {
  
  const colourArr = [
    "hsla(87, 12%, 51%, 1)",
    "hsla(224, 19%, 27%, 1)",
    "hsla(116, 24%, 70%, 1)",
    "hsla(118, 24%, 58%, 1)",
    "hsla(256, 9%, 32%, 1)",
    "hsla(5, 6%, 41%, 1)",
    "hsla(218, 23%, 40%, 1)",
    "hsla(240, 15%, 32%, 1)",
    "hsla(9, 12%, 55%, 1)",
    "hsla(85, 22%, 40%, 1)",
  ];

  const count = data.length;

  const slicedArray = colourArr.slice(0, count);

  return slicedArray;

}

const GenGraphDisplay = ({ generationmix, typeIndex }) => {

  //console.log(typeIndex);
  let totalCombined = 0;

  let currDataSet = [];

  if (generationmix[typeIndex].fuel === "all") {
      
    currDataSet = [
      ...generationmix,
      { fuel: "All Others Total", perc: totalCombined },
    ];

  } else {

    totalCombined = 100 - generationmix[typeIndex].perc;
    currDataSet = [
      generationmix[typeIndex],
      { fuel: "All Others Total", perc: totalCombined },
    ];
  }

  const arr = prepData(currDataSet);

  const colourSet = prepColors(currDataSet);

  const data = {
    labels: arr[0],
    datasets: [
      {
        label: "Generation source",
        data: arr[1],
        backgroundColor: colourSet,
        borderColor: colourSet,
        borderWidth: 1,
        width: 120,
        height: 120,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default GenGraphDisplay;
