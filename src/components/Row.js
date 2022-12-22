import React from 'react'

export default function Row({ guess, currentGuess }) {

    if (guess) {

        let guessRow = guess.map((l,i) => (
            <div key={i} className={l.color}>{l.key}</div>
        ))

        return (
            <div className='row'>{guessRow}</div>
        )
    }

    if (currentGuess) {
        
        let letters = currentGuess.split('')
        
        let filledSquares = letters.map((letter, i) => (
            <div key={i} className="filled">{letter}</div>
        ))

        let emptySquares = [...Array(5 - letters.length)].map((v, i) => (
            <div key={i}></div>
        ))

        return(
            <div className='row current'>{filledSquares} {emptySquares}</div>
        )
    }

    return (
        <div className='row'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
