import { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Room(){
    const [input, setInput] = useState('');
    return (
        <body>
         <input value={input} onInput={(e) => setInput(e.target.value)}/>
         <Link to= {`/Room/${input}`}>
            <button>
                Enter Room
            </button>
        </Link>

        </body>
    )
}