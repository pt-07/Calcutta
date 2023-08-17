import React, {useEffect, useState} from 'react'
import useSwr from "swr"

const fetcher = (...args) => fetch(...args).then((res)=>res.json());
function CreateRoom(){
    const [names, setNames] = useState(null);
    const{data} = useSwr("https://dog.ceo/api/breeds/image/random", fetcher)
    
    return(
        <div>
            <img width = {500} src={data?.message}/>
        </div>
    )
    
}
export default CreateRoom