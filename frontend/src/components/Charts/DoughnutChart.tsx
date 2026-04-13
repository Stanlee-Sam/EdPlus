import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Present", "Absent/Late"],
    datasets: [
      {
        data: [1168, 116],
        backgroundColor: ["#0ea5e9", "#134e4a"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
