import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import {callSolutionService} from "./services/solutionService";


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

  return (
    <div className="App">
      <h1>Gwordle</h1>
      {solution && <Wordle solution={solution} getNewSolution={getNewSolution} />}
    </div>
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