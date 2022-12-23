import { useState } from 'react'
import {allowedSet} from '../resources/allowed'

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0) // tracks number of guesses
    const [currentGuess, setCurrentGuess] = useState('') // the word being typed currentley, update on keypress
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) // {a: 'green', b: 'yellow', c: 'grey' ...}

    // format a guess
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map(l => {
            return {key: l, color: 'grey'}
        })
        

        // find any green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // find any yellow letters
        formattedGuess.forEach((l, i )=> {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        
        setGuesses((prev) => {
            let newGuesses = [...prev]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory([...history, currentGuess])
        
        setTurn(prev => prev + 1)

        setUsedKeys((prev) => {
            let newKeys = {...prev}

            formattedGuess.forEach((l, i) => {
                const currentColor = newKeys[l.key]

                if(l.color === 'green'){
                    newKeys[l.key] = 'green'
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green'){
                    newKeys[l.key] = 'yellow'
                    return
                }
                if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'grey'
                    return
                }
            })

            return newKeys
        })

        setCurrentGuess('')
    }

    const handleKeyUp = ({key}) => {

        if (key === 'Backspace') {
            setCurrentGuess(currentGuess.slice(0, -1))
            return
        }

        if (key === 'Enter') {
            // don't allow duplicate words
            if (turn > 5){
                console.log('All Guesses Have Been Used')
                return
            }
            // don't allow more than 5 guesses
            if (history.includes(currentGuess)) {
                console.log('You already tried that word')
                return
            }
            // word must be 5 chars long
            if (currentGuess.length !== 5) {
                console.log('Word must be 5 chars long');
                return
            }

            if(!allowedSet.has(currentGuess)){
                console.warn('Guess must be a real word!')
                return
            }
           
            // If guess is valid, format guess
            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5 && usedKeys[key.toLowerCase()] !== 'grey') {
            setCurrentGuess(currentGuess + key.toLowerCase())
        }

    }

    const resetGame = () => {
        console.log("Resetting game...")
        setHistory([])
        setIsCorrect(false)
        setUsedKeys({})
        setGuesses([...Array(6)])
        setTurn(0)
 
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyUp, usedKeys, resetGame}
}

export default useWordle