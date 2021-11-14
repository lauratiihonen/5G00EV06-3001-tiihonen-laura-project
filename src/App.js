import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cities from "./cities.json";
import Select from "react-select";
const city = [
  { value: "HKI", label: "Helsinki" },
  { value: "TPE", label: "Tampere" },
];

function App() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [destinationTime, setDestinationTime] = useState("");

  async function fetchPerson() {
    let hr = await fetch(
      `https://rata.digitraffic.fi/api/v1/live-trains/station/${departure}/${destination}`
    );
    let data = await hr.json();
    console.log(data);
    setDate(data[0].departureDate);
    setDepartureTime(data[0].timeTableRows[0].scheduledTime);
    setDestinationTime(data[0].timeTableRows[89].scheduledTime);
  }

  return (
    <div className="App">
      <h1>Journey planner</h1>
      <Select
        id="departureSelect"
        options={city}
        className="mb-3"
        placeholder="Departure"
        isSearchable
        onChange={(event) => setDeparture(event.value)}
      />
      <Select
        id="destinationSelect"
        options={city}
        className="mb-3"
        placeholder="Destination"
        isSearchable
        onChange={(event) => setDestination(event.value)}
      />
      <button onClick={fetchPerson}>Get Journey</button>
      <p>Journey date: {date}</p>
      <p>Departure time: {departureTime}</p>
      <p>Arrival: {destinationTime}</p>
    </div>
  );
}

export default App;
