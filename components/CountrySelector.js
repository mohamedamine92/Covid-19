import { useState } from "react";
import { useStats } from "../utils/useStats";
import Stats from "./Stats";
import styles from "styled-components";
import React, { Component } from "react";
import Select from "react-select";

const Container = styles.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const colourStyles = {
  width: "10rem",
  height: "2rem",
  backgroundColor: "transparent",
  fontSize: "1.4rem",
  borderRadius: "0",
  outline: "none",
  color: "#fff",
  border: "none",
  borderBottom: "2px solid #f2f2f2",
  marginBottom: "2rem",
  textAlign: "center",
  position: "relative"
};

export default function CountrySelector() {
  const { stats: countries, loading, error } = useStats("https://covid19.mathdro.id/api/countries");
  const [selectedCountry, setSelectedCountry] = useState({
    value: "FRA",
    label: "France"
  });

  const options = countries
    ? countries.countries.map(elem => {
        return { value: elem.iso3, label: elem.name };
      })
    : [];
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
        ></Select>
      </div>

      <Stats url={`https://covid19.mathdro.id/api/countries/${selectedCountry.value}`}></Stats>
    </div>
  );
}
