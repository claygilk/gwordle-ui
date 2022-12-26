import React from 'react'

export default function About() {
    return (
        <div>
            <h3>How To Play</h3>
            <h4>Guess the Gwordle in 6 tries</h4>
            <br/>
            <ul>
                <li>Each guess must be a valid 5-letter word.</li>
                <li>The color of the tiles will change to show how close your guess was to the word.</li>
            </ul>
            <p>
                The letter will turn green if it is in the correct spot. <br/>
                The letter will turn yellow if it is in the word, but in the incorrect spot. <br/>
                The letter will turn grey if it is not in the word. <br/>
            </p>
        </div>
    )
}
