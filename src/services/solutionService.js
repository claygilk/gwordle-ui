
export async function callSolutionService () {
    let newSolution = await fetch('http://localhost:3001/solutions')
        .then(res => res.json())
        .then(json => {
            const randomSolution = json[Math.floor(Math.random() * json.length)]
            return randomSolution.word
        })
    console.log("The Solution is: " + newSolution)
    return newSolution 
}

