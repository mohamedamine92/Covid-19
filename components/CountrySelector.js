import { useState } from "react";
import useStats from "../utils/useStats";
import Stats from "./Stats";
import styles from "styled-components";

const Container = styles.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Select = styles.select`
  width: 10rem;
  height: 2rem;
  background-color: transparent;
  font-size: 1.4rem;
  border-radius: 0;
  outline: none;
  color: #fff;
  border: none;
  border-bottom: 2px solid #f2f2f2;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: 'OLA';
    color: red;    
    position: absolute;
    top: 0;
    right: 0;
  }
`;
export default function CountrySelector() {
  const { stats: countries, loading, error } = useStats(
    "https://covid19.mathdro.id/api/countries"
  );
  const [selectedCountry, setSelectedCountry] = useState("FRA");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <Container>
      <h2>Currently Showing {selectedCountry}</h2>
      <Select
        onChange={e => {
          setSelectedCountry(e.target.value);
        }}
        defaultValue={selectedCountry}
      >
        {Object.entries(countries.countries).map(([country, code]) => (
          <option
            selected={selectedCountry === countries.iso3[code]}
            key={code}
            value={countries.iso3[code]}
          >
            {country}
          </option>
        ))}
      </Select>
      <Stats
        url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`}
      ></Stats>
    </Container>
  );
}
