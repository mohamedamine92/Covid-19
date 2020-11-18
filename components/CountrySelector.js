import { useState } from "react";
import { useStats } from "../utils/useStats";
import Stats from "./Stats";
import Select from "react-select";
import SimpleLineChart from "./SimpleLineChart";

export default function CountrySelector() {
  const { stats: countries, loading, error } = useStats("https://covid19.mathdro.id/api/countries");

  const [selectedCountry, setSelectedCountry] = useState({
    value: "FRA",
    label: "France"
  });

  const options = countries?.countries.map(({iso3, name}) => {
    return {value: iso3, label: name};
  }) ?? [];
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#fff" }}>
        Currently Showing {selectedCountry.label}
      </h2>
      <div style={{ marginBottom: "23px" }}>
        <Select
          onChange={selectedOption => {
            setSelectedCountry(selectedOption);
          }}
          defaultValue={{ value: "FRA", label: "France" }}
          options={options}
        />
      </div>

      <Stats url={`https://covid19.mathdro.id/api/countries/${selectedCountry.value}`}/>
      {selectedCountry.label === "France" && <SimpleLineChart/>}
    </div>
  );
}
