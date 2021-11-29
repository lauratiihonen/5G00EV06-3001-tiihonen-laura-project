import "./App.css";
import React from "react";
import { useState } from "react";
import Select from "react-select";
import customStyles from "./dropdownStyles.js";
import stations from "./stations.js";

function App() {
  const [state, setState] = useState("hidden");
  const [error, setError] = useState([]);
  const [departure, setDeparture] = useState([]);
  const [destination, setDestination] = useState([]);
  const [date, setDate] = useState([]);
  const [departureTime, setDepartureTime] = useState([]);
  const [destinationTime, setDestinationTime] = useState([]);

  /*
  -Fetches departure time, arrival time and journey date from api
  -Uses departure and destination from the user
  */
  async function fetchJourney() {
    setDate("");
    setDepartureTime("");
    setDestinationTime("");
    //Connect to API
    let hr = await fetch(
      `https://rata.digitraffic.fi/api/v1/live-trains/station/${departure}/${destination}`
    );
    let data = await hr.json();
    //If data is undefined, throw error
    if (data[0] !== undefined) {
      //Set journey info to visible
      setState("visible");
      //Set journey date the current date
      setDate(data[0].departureDate);

      //Loops until the end of the timetabelrows length from api
      for (var i = 0; i < Object.keys(data[0].timeTableRows).length; i++) {
        if (
          //Checks if the station matches the selected station and also it needs to be the departure time, not arrival time
          data[0].timeTableRows[i].stationShortCode === departure &&
          data[0].timeTableRows[i].type === "DEPARTURE"
        ) {
          //Takes only certain indexes from the date to convert it more readable
          var removetrash;
          removetrash = data[0].timeTableRows[i].scheduledTime;
          removetrash = removetrash.substring(11, 16);
          setDepartureTime(removetrash);
        }
        if (
          //Checks if the station matches the selected station and the time needs to be arrival time, not departure time
          data[0].timeTableRows[i].stationShortCode === destination &&
          data[0].timeTableRows[i].type === "ARRIVAL"
        ) {
          //Converts date more readable
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
      {/*
      -Uses React Select in dropdown menu
      -Uses options from ./stations.js
      -OnChange, sets selected stations to departure and destination
      -Uses custom style from ./dropdownstyles.js
      */}
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
      {/*
      -Calls fetchJourney function which connects to api
      */}
      <button onClick={fetchJourney} className="App-button">
        Get Journey
      </button>
      <br />
      {/*
      -Show error if needed
      */}
      <h2 className="App-error">{error}</h2>
      {/*
      -Visibility is hidden by default
      -Upon calling fetchJourney function, visibility is changed to visible
       */}
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
