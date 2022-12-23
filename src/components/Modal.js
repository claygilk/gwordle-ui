import React, { useEffect } from 'react'

export default function Modal({ isCorrect, turn, solution, resetGame, setShowModal, getNewSolution }) {

    return (
        <div className='modal'>
            {isCorrect && (
                <div>
                    <h1>You Win!</h1>
                    <p className='solution'>The Solution Was: {solution}</p>
                    <p >You found the solution in {turn} guesses</p>
                    <button onClick={() => {
                        console.log('resetGame()')
                        resetGame()
                        console.log('setShowModal()')
                        setShowModal(false)
                        console.log('getNewSolution()')
                        getNewSolution('hi there')
                    }}>Retry</button>
                </div>
            )}

            {!isCorrect && (
                <div>
                    <h1>Game Over!</h1>
                    <p className='solution'>The Solution Was: {solution}</p>
                    <p >Better luck next time...</p>
                    <button onClick={() => {
                        console.log('resetGame()')
                        resetGame()
                        console.log('setShowModal()')
                        setShowModal(false)
                        console.log('getNewSolution()')
                        getNewSolution('hi there')
                    }}>Retry</button>
                </div>
            )}
        </div>
    )
}
