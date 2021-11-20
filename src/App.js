import "./App.css";
import React from "react";
import { useState } from "react";
import Select from "react-select";
import customStyles from "./dropdownStyles.js";
import stations from "./stations.js";

function App() {
  //const [fetchCity, setCity] = useState("");
  const [state, setState] = useState("hidden");
  const [error, setError] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [destinationTime, setDestinationTime] = useState("");

  /*async function fetchCityNames() {
    let hr = await fetch(
      `https://rata.digitraffic.fi/api/v1/metadata/stations`
    );
    let cityNames = await hr.json();
    var cities= [];
    for (var i = 0; cityNames.length(); i++)
      if (cityNames[i].passengerTraffic === "true") {
        cities = [
          {
            value: `${cityNames[0].stationShortCode}`,
            label: `${cityNames[0].stationName}`,
          },
        ];
      }
  }*/

  async function fetchJourney() {
    setError("");
    setDepartureTime("");
    setDestinationTime("");
    setDate("");
    let hr = await fetch(
      `https://rata.digitraffic.fi/api/v1/live-trains/station/${departure}/${destination}`
    );
    let data = await hr.json();
    if (data[0] !== undefined) {
      setState("visible");
      setDate(data[0].departureDate);
      for (var i = 0; i < Object.keys(data[0].timeTableRows).length; i++) {
        if (
          data[0].timeTableRows[i].stationShortCode === departure &&
          data[0].timeTableRows[i].type === "DEPARTURE"
        ) {
          var removetrash;
          removetrash = data[0].timeTableRows[i].scheduledTime;
          removetrash = removetrash.substring(11, 16);
          setDepartureTime(removetrash);
        }
        if (
          data[0].timeTableRows[i].stationShortCode === destination &&
          data[0].timeTableRows[i].type === "ARRIVAL"
        ) {
          removetrash = data[0].timeTableRows[i].scheduledTime;
          removetrash = removetrash.substring(11, 16);
          setDestinationTime(removetrash);
        }
      }
    } else {
      setError("Oh no! we couldn't find a journey :/");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Journey planner</h1>
      </header>
      <p className="App-dropdown">
        <Select
          styles={customStyles}
          options={stations}
          placeholder="Departure"
          isSearchable
          onChange={(event) => setDeparture(event.value)}
        />
        <Select
          styles={customStyles}
          options={stations}
          placeholder="Destination"
          isSearchable
          onChange={(event) => setDestination(event.value)}
        />
      </p>
      <button onClick={fetchJourney} className="App-button">
        Get Journey
      </button>
      <br />
      <h2 className="App-error">{error}</h2>
      <tbody style={{ visibility: state }} className="App-data">
        <h2 style={{ textAlign: "center" }}>
          {departure} - {destination}
        </h2>
        <tr>
          <td style={{ paddingRight: "5rem" }}>Journey date:</td>
          <td>{date}</td>
        </tr>
        <tr>
          <td>Departure time:</td>
          <td>{departureTime}</td>
        </tr>
        <tr>
          <td>Arrival:</td>
          <td>{destinationTime}</td>
        </tr>
      </tbody>
    </div>
  );
}

export default App;
