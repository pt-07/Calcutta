import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// getting the names is not working
function Room() {
  const { id } = useParams();
  const [allNames, setAllNames] = useState([]);
  const [data, setData] = useState({
    name: "",
  });
  const submitName = async () => {
    await axios.post("http://localhost:5000/ninjas", {
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
        <button>Begin Auction</button>
      </Link>
    </div>
  );
}

export default Room;
