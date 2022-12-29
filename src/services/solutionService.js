
export async function callSolutionService () {

    let newSolution = await fetch(process.env.REACT_APP_API_URL)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const randomSolution = json[Math.floor(Math.random() * json.length)]
            return randomSolution.word
        })
        .catch(err => console.log(err))

    console.log("The Solution is: " + newSolution)
    return newSolution
}

