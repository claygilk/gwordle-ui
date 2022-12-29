import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import { callSolutionService } from "./services/solutionService";
import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom"
import UserScores from "./components/UserScores";
import About from "./components/About";
import Leaderboard from "./components/Leaderboard";
import NotFound from "./components/NotFound";
import Error from "./components/Error";

function App() {
  const [solution, setSolution] = useState(null)

  // callback function to get a new solution on reset
  const getNewSolution = () => {
    callSolutionService().then(newSolution => {
      setSolution(newSolution)
    })
  }

  //  Call solution service to get solution onMount
  useEffect(() => {
    callSolutionService().then(newSolution => {
      setSolution(newSolution)
    })
  }, [setSolution])

  // const activeNavLink = ({isActive}) => {
  //   return isActive ? {color: "red"} : {}
  // }
//   style={activeNavLink}
// style={activeNavLink}
// style={activeNavLink}

  return (
    <>
    <div>Debug: {process.env.NODE_ENV}</div>
    <div>Debug: {process.env.REACT_APP_API_URL}</div>
      <nav>
        <ul className="container">
          <li className="nav-link"><NavLink  to="/">Home</NavLink></li>
          <li className="nav-link"><NavLink  to="/about">About</NavLink></li>
          <li className="nav-link"><NavLink  to="/leaderboard">Leaderboard</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <h1>Gwordle</h1>
            {solution && <Wordle solution={solution} getNewSolution={getNewSolution} />}
            {!solution && <Error />}
          </div>
        } />
        <Route path="/about" element={<About/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/score/:id" element={<UserScores></UserScores>} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </>

  )
}


export default App;

// DONE: Log solution to console, and remove from UI
// DONE: Add a replay/reset feature
// TODO: Create service class to fetch solution fron JSON server
// TODO: Add info/rules/how-to-play page
// TODO: Create Dockerfile/Run in container
// TODO: Create Deployment.yml
// TODO: Create json-server container/deployment
// TODO: Run app in local k8s cluster
// TODO: Add dark mode
// TODO: Add animation on victory