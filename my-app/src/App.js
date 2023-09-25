import NavBar from "./NavBar";
import Home from "./pages/Home";
import EnterRoom from "./pages/EnterRoom";
import Room from "./pages/Room";
import Begin from "./pages/Begin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/EnterRoom">
            <EnterRoom />
          </Route>
          <Route exact path="/Room/:id">
            <Room />
          </Route>
          <Route exact path="/Room/:id/begin">
            <Begin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
