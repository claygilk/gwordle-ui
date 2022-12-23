import React, { useEffect,useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution, getNewSolution }) {
    const { currentGuess, handleKeyUp, isCorrect, guesses, turn, usedKeys, resetGame, streak} = useWordle(solution)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)

        return () => window.removeEventListener('keyup', handleKeyUp)
    }, [handleKeyUp])

    useEffect(() => {
        if(isCorrect){
            setTimeout(() => setShowModal(true), 1000)
        }

        if(turn > 5) {
            console.log('showing modal bc out of turns')
            setTimeout(() => setShowModal(true), 1000)
        }
    }, [isCorrect, turn])



  return (
    <div>
        <h3>Your Current Streak: { streak } </h3>
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



