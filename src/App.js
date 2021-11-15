import "./App.css";
import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";

const city = [
  { value: "HKI", label: "Helsinki" },
  { value: "TPE", label: "Tampere" },
];

function App() {
  //const [fetchCity, setCity] = useState("");
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
    let hr = await fetch(
      `https://rata.digitraffic.fi/api/v1/live-trains/station/${departure}/${destination}`
    );
    let data = await hr.json();

    setDate(data[0].departureDate);
    for (var i = 0; i < Object.keys(data[0].timeTableRows).length; i++) {
      if (
        data[0].timeTableRows[i].stationShortCode === departure &&
        data[0].timeTableRows[i].type === "DEPARTURE"
      ) {
        setDepartureTime(data[0].timeTableRows[i].scheduledTime);
      }
      if (
        data[0].timeTableRows[i].stationShortCode === destination &&
        data[0].timeTableRows[i].type === "ARRIVAL"
      ) {
        setDestinationTime(data[0].timeTableRows[i].scheduledTime);
      }
    }
  }

  return (
    <div className="App">
      <h1>Journey planner</h1>
      <Select
        options={city}
        className="mb-3"
        placeholder="Departure"
        isSearchable
        onChange={(event) => setDeparture(event.value)}
      />
      <Select
        options={city}
        className="mb-3"
        placeholder="Destination"
        isSearchable
        onChange={(event) => setDestination(event.value)}
      />
      <button onClick={fetchJourney}>Get Journey</button>
      <p>Journey date: {date}</p>
      <p>Departure time: {departureTime}</p>
      <p>Arrival: {destinationTime}</p>
    </div>
  );
}

export default App;
