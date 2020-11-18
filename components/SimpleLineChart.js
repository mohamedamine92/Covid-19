import React, {useState} from "react";
import {Line} from "react-chartjs-2";
import colors from "../styles/colors";
import {formatDateShort, useStats} from "../utils/useStats";

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
};

const formatData = data => {
  console.log(data);
  const datasets = [];
  //let unifiedData = {};
  if (data.some(({deces}) => deces)) {
    datasets.push({
      spanGaps: true,
      label: "Décès",
      data: data.map(({deces}) => deces || 0),
      backgroundColor: colors.red
    });
  }

  if (data.some(({reanimation}) => reanimation)) {
    datasets.push({
      spanGaps: true,
      label: "En réanimation",
      data: data.map(({reanimation}) => reanimation || 0),
      backgroundColor: colors.darkerGrey
    });
  }

  if (data.some(({hospitalises}) => hospitalises)) {
    datasets.push({
      spanGaps: true,
      label: "Autre hospitalisation",
      data: data.map(({hospitalises, reanimation}) => {
        if (hospitalises) return hospitalises - (reanimation || 0);
        else return 0;
      }),
      backgroundColor: colors.darkGrey
    });
  }

  if (data.some(({gueris}) => gueris)) {
    datasets.push({
      spanGaps: true,
      label: "Guéris",
      data: data.map(({gueris}) => gueris || 0),
      backgroundColor: colors.green
    });
  }

  if (data.some(({casConfirmes}) => casConfirmes)) {
    datasets.push({
      spanGaps: true,
      label: "Confirmés",
      data: data.map(({casConfirmes}) => casConfirmes || 0),
      backgroundColor: colors.orange
    });
  }

  return {
    labels: data.map(d =>formatDateShort(d.date)),
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
      <Line data={formatData(data)} options={options} height={400} width={1500}/>
    </div>
  );
}
