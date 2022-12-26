import React from 'react'
import { useParams } from 'react-router-dom'

export default function UserScores() {

    const { id } = useParams()

    return (
        <div>Showing Scores for User: {id}</div>
    )
}
