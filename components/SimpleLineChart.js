import React from "react";
import { Line } from "react-chartjs-2";
import colors from "../styles/colors";
import { useStats } from "../utils/useStats";

const options = {
  legend: {
    display: true
  },
  tooltips: {
    mode: "index",
    filter(item) {
      return item.value !== "NaN";
    }
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "DD/MM"
          },
          tooltipFormat: "DD/MM"
        }
      }
    ]
  }
};

const formatData = data => {
  console.log(data);
  const datasets = [];
  let unifiedData = {};
  if (data.some(h => h.deces)) {
    datasets.push({
      spanGaps: true,
      label: "Décès",
      data: data.map(h => h.deces || null),
      backgroundColor: colors.red
    });
  }

  if (data.some(h => h.reanimation)) {
    datasets.push({
      spanGaps: true,
      label: "En réanimation",
      data: data.map(h => h.reanimation || null),
      backgroundColor: colors.darkerGrey
    });
  }

  if (data.some(h => h.hospitalises)) {
    datasets.push({
      spanGaps: true,
      label: "Autre hospitalisation",
      data: data.map(h => {
        if (h.hospitalises) {
          return h.hospitalises - (h.reanimation || 0);
        }

        return null;
      }),
      backgroundColor: colors.darkGrey
    });
  }

  if (data.some(h => h.gueris)) {
    datasets.push({
      spanGaps: true,
      label: "Guéris",
      data: data.map(h => h.gueris || null),
      backgroundColor: colors.green
    });
  }

  if (data.some(h => h.casConfirmes)) {
    datasets.push({
      spanGaps: true,
      label: "Confirmés",
      data: data.map(h => h.casConfirmes),
      backgroundColor: colors.orange
    });
  }

  return {
    labels: data.map(h => new Date(h.date)),
    datasets
  };
};

export default function SimpleLineChart() {
  const { stats: franceStats, loading, error } = useStats(
    "https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  const data = franceStats.filter(
    elem => elem.code === "FRA" && elem.sourceType === "ministere-sante"
  );
  return (
    <div style={{ padding: "1em", backgroundColor: "white" }}>
      <Line data={formatData(data)} options={options} height={220} width={400}></Line>
    </div>
  );
}
