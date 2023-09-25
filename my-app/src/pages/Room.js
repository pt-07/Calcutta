import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Room() {
  const { id } = useParams();
  const [allNames, setAllNames] = useState([]);
  const [data, setData] = useState({
    name: "",
  });
  const submitName = async () => {
    await axios.post(`http://localhost:5000/${id}/names`, {
      name: data.name,
    });
  };

  const getNames = async () => {
    axios.get("http://localhost:5000/getNinjas").then((res) => {
      let jsonNameArray = res.data;
      const arr = [];
      for (let i = 0; i < jsonNameArray.length; i++) {
        arr.push(jsonNameArray[i].name);
      }
      setAllNames(arr);
    });
  };

  const sendTeams = async () => {
    axios.post("http://localhost:5000/teams", {
      teams: [
        "Arizona Cardinals",
        "Atlanta Falcons",
        "Baltimore Ravens",
        "Buffalo Bills",
        "Carolina Panthers",
        "Chicago Bears",
        "Cincinnati Bengals",
        "Cleveland Browns",
        "Dallas Cowboys",
        "Denver Broncos",
        "Detroit Lions",
        "Green Bay Packers",
        "Houston Texans",
        "Indianapolis Colts",
        "Jacksonville Jaguars",
        "Kansas City Chiefs",
        "Las Vegas Raiders",
        "Los Angeles Chargers",
        "Los Angeles Rams",
        "Miami Dolphins",
        "Minnesota Vikings",
        "New England Patriots",
        "New Orleans Saints",
        "New York Giants",
        "New York Jets",
        "Philadelphia Eagles",
        "Pittsburgh Steelers",
        "San Francisco 49ers",
        "Seattle Seahawks",
        "Tampa Bay Buccaneers",
        "Tennessee Titans",
        "Washington Football Team",
      ],
    });
  };

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value.trim();
    setData(newData);
  }
  //need to fetch list on names from database and display it

  return (
    <div>
      <h1> Your Room Code is: {id}</h1>

      <form onSubmit={(e) => submitName(e)} onChange={getNames}>
        <label> Enter Your Name </label>
        <input
          onChange={(e) => {
            handle(e);
          }}
          id="name"
          value={data.name}
          placeholder="name"
          type="text"
        ></input>
      </form>

      <h3>Name List : {allNames} </h3>

      <Link to={`/Room/${id}/begin`}>
        <button onClick={sendTeams}>Begin Auction</button>
      </Link>
    </div>
  );
}

export default Room;
