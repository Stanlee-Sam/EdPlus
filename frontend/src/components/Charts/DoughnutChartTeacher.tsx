import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartTeacher = () => {
  const data = {
    labels: ["Present", "Absent/Late"],
    datasets: [
      {
        data: [129, 13],
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

export default DoughnutChartTeacher;
