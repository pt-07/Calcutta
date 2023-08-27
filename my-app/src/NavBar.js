import { Link } from "react-router-dom"
import { Route } from "react-router-dom"
export default function NavBar(){
    return <nav className = "nav">
        <a href="/" className="site-title">
            Calcutta Auction
        </a>
        <ul>
            <Link to = {`/CreateRoom`}> Create Room</Link>
            <Link to = "/EnterRoom"> Enter Room</Link>
            <Link to = {`/Room/${Math.floor(Math.random() * 1000 +1)}`}> Room</Link>

        </ul>
    </nav>
}  