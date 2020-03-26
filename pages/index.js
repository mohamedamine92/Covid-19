import { createGlobalStyle } from "styled-components";
import Stats from "../components/Stats";
import CountrySelector from "../components/CountrySelector";
import { Fragment } from "react";
import backgroundImage from "../assets/background.jpeg";
const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      min-height: 100%;
  }
  body {
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function IndexPage() {
  return (
    <Fragment>
      <GlobalStyle />
      <h2 style={{ textAlign: "center", color: "#fff" }}>Global Stats</h2>
      <Stats url="https://covid19.mathdro.id/api"> </Stats>
      <CountrySelector></CountrySelector>
    </Fragment>
  );
}
