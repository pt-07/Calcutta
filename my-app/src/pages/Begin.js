import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Begin() {
  const [data, setData] = useState({
    Bid: 0,
  });
  const [team, setTeam] = useState("none");
  const [countdown, setCountdown] = useState(15);

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

    return <span>{countdown}</span>;
    // going to need to restart everytime, a new bid is sent to the Database
  }

  function getTeam() {
    axios.get("http://localhost:5000/teams").then((res) => {
      const teamArr = res.data.teams;
      let rand = Math.floor(Math.random() * teamArr.length);
      setTeam(teamArr[rand]);
      teamArr.splice(rand, 1);
      console.log(teamArr);

      axios.put("http://localhost:5000/teams/64f90c50bcea429209c184c9", {
        teams: teamArr,
      });
      //need to get bid

      axios.post("http://localhost:5000/bidTeam", {
        team: team,
        bid: highBid,
      });
      axios.put("http://localhost:5000/bids/64f6780a4635f266f41f44d0", {
        bid: 0,
      });
    });
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

  const postBid = async () => {
    console.log(data.Bid);

    if (data.Bid > highBid) {
      await axios.post("http://localhost:5000/bids", {
        name: "OnlyBid", // Change this to an appropriate bid name
        bid: data.Bid,
      });
      setData({ ...data, Bid: 0 }); // Reset the bid input
      setCountdown(15); // resets countdown on every bid
    }
  };

  // This works on every buffer getting the highest bid.
  const getHighBid = async () => {
    axios.get("http://localhost:5000/getBid").then((res) => {
      let jsonNameArray = res.data;
      let arr = 0;
      for (let i = 0; i < jsonNameArray.length; i++) {
        if (jsonNameArray[i].bid > arr) {
          arr = jsonNameArray[i].bid;
        }
      }
      console.log(arr);
      setHighBid(arr);
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    postBid();
  }

  const clearBids = async () => {
    try {
      await axios.delete("http://localhost:5000/bids");
      console.log("All bids have been cleared.");
    } catch (error) {
      console.error("Error clearing bids:", error);
    }
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
        Count Down for Bidding: <Countdown />
      </h2>

      <form onSubmit={handleSubmit} onChange={getHighBid}>
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
      <button onClick={clearBids}>Clear Bids</button>
    </div>
  );
}
export default Begin;
