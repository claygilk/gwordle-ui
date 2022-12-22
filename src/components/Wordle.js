import React, { useEffect,useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution, getNewSolution }) {
    const { currentGuess, handleKeyUp, isCorrect, guesses, turn, usedKeys, resetGame} = useWordle(solution)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        
        window.addEventListener('keyup', handleKeyUp)

        if(isCorrect){
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyUp)
        }

        if(turn > 5) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyUp)
        }

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp, isCorrect, turn])



  return (
    <div>
        <h3>Your Guess is: { currentGuess }</h3>
        { isCorrect && <h3>You're Correct!</h3>}
        <Grid currentGuess={currentGuess} guesses={guesses} turn = {turn}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <Modal 
            isCorrect={isCorrect} 
            turn={turn} 
            solution={solution} 
            resetGame={resetGame} 
            setShowModal={setShowModal}
            getNewSolution={getNewSolution}
        />}
    </div>

  )
}


