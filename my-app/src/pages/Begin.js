import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Begin() {
  const [data, setData] = useState({
    Bid: 0,
  });
  const [team, setTeam] = useState("none");

  const teamList = ["Giants", "Eagles", "Redskins", "Cowboys"];

  function End() {
    //needs to store a map (team = key, value = bid) to the db, POST request to store map
    //need to reset bids and update team array (PUT requests)
  }

  function displayPastBids() {
    //GET request to display the map of team/bids
  }

  // function to create timer
  function Countdown({ seconds }) {
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef(); // keeps values throughout renders

    useEffect(() => {
      timerId.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
      if (countdown <= 0) {
        clearInterval(timerId.current);
        chooseTeam();
        // a put request to add a team to a user
      }
    }, [countdown]);

    return <h2>Count Down: {countdown} </h2>;
    // going to need to restart everytime, a new bid is sent to the Database
  }
  // chooses a team randomly from the array
  function chooseTeam() {
    let rand = Math.floor(Math.random() * teamList.length) + 1;
    setTeam(teamList[rand]);
  }

  useEffect(() => {
    chooseTeam();
  }, []); // Empty dependency array to run only once;

  const [highBid, setHighBid] = useState(0);

  const putBid = async () => {
    console.log(data.Bid);
    await axios.put("http://localhost:5000/bids/64f6780a4635f266f41f44d0", {
      bid: data.Bid,
    });
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
      <h3>We will now begin the auction</h3>
      <h2>
        {" "}
        Count Down for Bidding: <Countdown seconds={15} />{" "}
      </h2>
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

      <button>End Bidding</button>
    </div>
  );
}
export default Begin;
