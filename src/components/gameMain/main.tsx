import Card from './card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card as CardType } from 'types'
import { Button } from '../ui/button'
import { Player } from 'types'

let currentPlayer = 0

const TruthOrDareGame = () => {
  const [card, setCard] = useState({})
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirst, setIsFirst] = useState(true)


  useEffect(() => {
    getPlayers()
  }, [])


  const getPlayers = async () => {
    const response = await axios.get("/api/v1/players")
    const players = response.data.players
    setPlayers(players)
    console.log(players);
  }

  const nextPlayer = async () => {
    if (isFirst) {
      setIsFirst(false)
      return
    }
    if (currentPlayer === players.length - 1) {
      setCurrentPlayerIndex(0)
      currentPlayer = 0
    } else {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
      currentPlayer = currentPlayer + 1
    }
  }

  // const updateQuestionValue = (state: Player[], idToUpdate: string, newQuestionValue: number) => {
  //   state.map(item => {
  //     if (item.id === idToUpdate) {
  //       return { ...item, questionValue: newQuestionValue }
  //     } else {
  //       return item
  //     }
  //   })
  // }

  const updateQuestonValuev2 = () => {
    const playerId = players[currentPlayer]._id
    console.log(playerId);

    const questionValue = players[currentPlayer].questionValue
    const updatedQuestionValue = questionValue + 1;

    // Stworzenie nowego obiektu gracza z zaktualizowaną wartością questionValue
    const updatedPlayer = {
      ...players[currentPlayer],
      questionValue: updatedQuestionValue,
    };
    console.log(updatedPlayer);


    // Stworzenie nowej tablicy graczy z zaktualizowanym obiektem gracza na odpowiednim indeksie
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer] = updatedPlayer;

    // Ustawienie nowej tablicy graczy
    setPlayers(updatedPlayers);
  }




  const getQuestion = async () => {
    setIsLoading(true)
    nextPlayer()
    if (players[currentPlayer].questionValue > 1) {
      const NoQuestion = {
        typ: "Ponad Limit",
        tresc: "Możesz wziąć prawdę maksymalnie dwa razy pod rząd. Wykorzystałeś ten limit - czas na Wyzwanie"
      }
      setCard(NoQuestion)
      setIsLoading(false)
      return
    }

    const response = await axios.get("/api/v1/game/draw/?typ=Prawda")
    if (response.status === 204) {  // Jeżeli nie ma więcej kart
      const response = await axios.get("/api/v1/game/draw/?typ=Wyzwanie")
      if (response.status === 204) {
        const NoCards = {
          typ: "Brawo",
          tresc: "Gratulacje, wykorzystaliście wszystkie karty - To już jest koniec"
        }
        setCard(NoCards)
        setIsLoading(false)
        return
      }
      const NoCards = {
        typ: "Koniec Pytań",
        tresc: "Brawo, wykorzystaliście wszystkie pytania - Teraz został już tylko wyzwania"
      }
      setIsLoading(false)
      setCard(NoCards)
      return
    }

    const card = response.data.card[0]  // [0] jest dlatego że api zwraca tablice mimio zwracania tylko jednego elementu
    console.log(players[currentPlayer].playerName);

    setCard(card)

    // Zmiania wartości ilosc w pytaniu w bazie danych
    const patchData = {
      ilosc: card.ilosc - 1
    }
    await axios.patch(`/api/v1/game/${card._id}`, patchData)

    updateQuestonValuev2()
    console.log(players[currentPlayer].playerName);
    setIsLoading(false)
    // setPlayers(updatedPlayers)
  }

  const getDare = async () => {
    setIsLoading(true)
    const response = await axios.get("/api/v1/game/draw/?typ=Wyzwanie")
    if (response.status === 204) {  // Jeżeli nie ma więcej kart
      const response = await axios.get("/api/v1/game/draw/?typ=Prawda")
      if (response.status === 204) {
        const NoCards = {
          typ: "Brawo",
          tresc: "Gratulacje, wykorzystaliście wszystkie karty - To już jest koniec"
        }
        setCard(NoCards)
        setIsLoading(false)
        return
      }
      const NoCards = {
        typ: "Koniec Wyzwań",
        tresc: "Brawo, wykorzystaliście wszystkie wyzwania - Teraz zostały już tylko pytania"
      }
      setCard(NoCards)
      setIsLoading(false)
      return
    }

    const card = response.data.card[0]  // [0] jest dlatego że api zwraca tablice mimio zwracania tylko jednego elementu
    setCard(card)

    const patchData = {
      ilosc: card.ilosc - 1
    }
    await axios.patch(`/api/v1/game/${card._id}`, patchData)
    nextPlayer()
    setIsLoading(false)
  }



  return (
    <div className='flex flex-col justify-center items-center'>
      <span className='text-2xl font-bold text-slate-800'>
        {players.length > 0 && players[currentPlayerIndex].playerName}
      </span>
      <Card data={card as CardType} />
      <div className='flex flex-col gap-2 mt-4 w-[200px]'>
        <Button className='bg-purple-500' onClick={getQuestion} disabled={isLoading}>
          Pytanie
        </Button>
        <Button onClick={getDare} className='bg-rose-600' disabled={isLoading}>
          Wyzwanie
        </Button>
        <Button onClick={() => console.log(players[currentPlayer])}>
          Techniczny
        </Button>
        <Button onClick={() => console.log(players)}>
          Pokaz graczy
        </Button>
      </div>
    </div >
  )
}

export default TruthOrDareGame