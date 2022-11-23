import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function Chart(props) {
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
        label: "Profit",
        data: props.data2,
        borderColor: "green",
        backgroundColor: "green",
        lineTension: 0,
      },
      {
        label: "Losses",
        data: props.data3,
        borderColor: "red",
        backgroundColor: "red",
        lineTension: 0,
      },
    ],
  };

  return (
    <>
      <div style={{ width: "1200px", margin: "auto" }}>
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default Chart;
