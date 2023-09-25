import React, { useEffect, useState } from "react";
import axios from "axios";

function Begin() {
  const [data, setData] = useState({
    Bid: 0,
  });
  const [team, setTeam] = useState("none");
  const [teamId, setTeamId] = useState("");

  function End() {
    //needs to store a map (team = key, value = bid) to the db, POST request to store map
    //need to reset bids and update team array (PUT requests)
  }

  function displayPastBids() {
    //GET request to display the map of team/bids
  }

  useEffect(() => {
    axios.get("http://localhost:5000/getTeamId").then((res) => {
      setTeamId(res.data._id);
    });
  }, []);

  function getTeam() {
    axios.get("http://localhost:5000/teams").then((res) => {
      const teamArr = res.data.teams;
      let rand = Math.floor(Math.random() * teamArr.length);
      setTeam(teamArr[rand]);
      teamArr.splice(rand, 1);
      console.log(teamArr);
      // updates by id
      axios.put(`http://localhost:5000/teams/${teamId}`, {
        teams: teamArr,
      });
      //need to get bid

      axios.post("http://localhost:5000/bidTeam", {
        team: team,
        bid: highBid,
      });
      //   axios.put("http://localhost:5000/bids/64f6780a4635f266f41f44d0", {
      //     bid: 0,
      //   });
    });
  }

  const [highBid, setHighBid] = useState(0);

  const putBid = async () => {
    console.log(highBid);

    // if (data.Bid > highBid) {
    //   await axios.put("http://localhost:5000/bids/64f6780a4635f266f41f44d0", {
    //     bid: data.Bid,
    //   });
    // }
  };

  const getHighBid = async () => {
    axios.get("http://localhost:5000/getBid").then((res) => {
      let jsonNameArray = res.data;
      let arr = 0;
      for (let i = 0; i < jsonNameArray.length; i++) {
        if (jsonNameArray[i].bid > arr) {
          arr = jsonNameArray[i].bid;
        }
      }
      setHighBid(arr);
    });
  };

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return (
    <div>
      <h3>We will now begin the auction in need to insert timer here</h3>
      <form onSubmit={(e) => putBid(e)} onChange={getHighBid}>
        <label> Enter Your bid </label>
        <input
          onChange={(e) => {
            handle(e);
          }}
          id="Bid"
          value={data.Bid}
          placeholder="Bid"
          type="number"
        ></input>
      </form>
      <h1>Current team: {team}</h1>
      <h1>Highest Bid : {highBid}</h1>

      <button onClick={getTeam}>End Bidding</button>
    </div>
  );
}
export default Begin;
