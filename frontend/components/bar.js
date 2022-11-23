import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { colorchartjs } from "colorchartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(props) {
  var colordata2 = colorchartjs(props.data2, "green", "red", 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        //position: 'bottom',
        display: true,
        text: props.charttitle,
      },
    },
  };

  const labels = props.data1;

  const data = {
    labels,
    datasets: [
      {
        label: "PNL",
        data: props.data2,
        borderColor: "green",
        backgroundColor: colordata2,
        hoverBackgroundColor: "grey",
        lineTension: 0,
      },
      {
        label: "FEE",
        data: props.data3,
        backgroundColor: "orange",
        lineTension: 0,
      },
    ],
  };

  return (
    <>
      <div style={{ width: "900px", margin: "auto" }}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export default Chart;
