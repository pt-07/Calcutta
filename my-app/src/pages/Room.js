

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Room  () {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [names, setNames] = useState([{name: 'Patrick', id:1}]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {name}
        //fetch('http://localhost:5000', {method: 'POST'})
    }

    //need to generate rest API
    useEffect(() =>{
        fetch('http://localhost:5000/names')

        .then(res => {
            return res.json()
        })
        .then(data=>{
            console.log(data)
            setNames(data)
        })
    },[])
    


    return(
        <div>
            <h1> Your Room Code is: {id}</h1>
            <form onSubmit={handleSubmit}> 
                <label>Enter your name</label>
                <input 
                 type="text"
                 required
                 value = {name}
                 onChange={(e) => setName(e.target.value)}
                 />
                <button onClick={(e) => setName(e.target.value)}>Submit</button>
            </form>
            <p>
                {name}
                
            </p>

        </div>
    )
}

export default Room;