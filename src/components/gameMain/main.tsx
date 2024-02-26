import Card from './card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card as CardType } from 'types'
import { Button } from '../ui/button'
import { Player } from 'types'


const TruthOrDareGame = () => {
  const [card, setCard] = useState({})
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  useEffect(() => {
    getPlayers()
  }, [])


  const getPlayers = async () => {
    const response = await axios.get("/api/v1/players")
    const players = response.data.players
    setPlayers(players)
    console.log(players);
  }

  const nextPlayer = () => {
    if (currentPlayerIndex === players.length - 1) {
      setCurrentPlayerIndex(0)
    } else {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    }
  }

  const updateQuestionValue = (state: Player[], idToUpdate: string, newQuestionValue: number) => {
    state.map(item => {
      if (item.id === idToUpdate) {
        return { ...item, questionValue: newQuestionValue }
      } else {
        return item
      }
    })
  }




  const getQuestion = async () => {
    nextPlayer()
    const response = await axios.get("/api/v1/game/draw/?typ=Prawda")
    const card = response.data.card[0]  // [0] jest dlatego że api zwraca tablice mimio zwracania tylko jednego elementu
    setCard(card)
    const updatedPlayers = updateQuestionValue(players, players[currentPlayerIndex].id, card.value)
    setPlayers(updatedPlayers)
  }

  const getDare = async () => {
    nextPlayer()
    const response = await axios.get("/api/v1/game/draw/?typ=Wyzwanie")
    const card = response.data.card[0]  // [0] jest dlatego że api zwraca tablice mimio zwracania tylko jednego elementu
    setCard(card)
  }



  return (
    <div className='flex flex-col justify-center items-center'>
      {players.length > 0 && players[currentPlayerIndex].playerName}
      <Card data={card as CardType} />
      <div className='flex flex-col gap-2 mt-4 w-[200px]'>
        <Button onClick={getQuestion}>
          Pytanie
        </Button>
        <Button onClick={getDare} className='bg-red-600'>
          Wyzwanie
        </Button>
        <Button onClick={getPlayers}>
          Techniczny
        </Button>
        <Button onClick={() => console.log(players)}>
          Techniczny v2
        </Button>
      </div>
    </div >
  )
}

export default TruthOrDareGame