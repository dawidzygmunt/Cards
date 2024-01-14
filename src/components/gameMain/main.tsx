import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Card from './card'

const MainGame = () => {
  const licznikRef = useRef(0)

  const incrementLicznik = (value) => {
    licznikRef.current += 1
    if (value === 0) {
      licznikRef.current = 0
    }
  }



  const [selectedPlayer, setSelectedPlayer] = useState([])
  const [players, setPlayers] = useState([])
  const [question, setQuestion] = useState([]);
  const [challenge, setChallenge] = useState([]);
  const [isRenderedQuestion, setIsRenderedQuestion] = useState(false);
  const [isRenderedChallenge, setIsRenderedChallenge] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);



  const handleQuestion = async (index) => {
    //Pobieranie danych o graczu
    const player = await selectPlayer()
    const questionValue = player.questionValue
    console.log('Wybrany gracz: ' + player.playerName + 'oraz jego questionvalue: ' + questionValue);
    // Sprawdzanie czy można wybrać pytanie
    // Jeżeli nie może
    if (questionValue > 1) {
      setIsRenderedChallenge(false)
      setSelectedPlayer(player.playerName)
      setIsDisabled(true)   // wyłączenie przycisku z pytaniem
      const tablica = {
        typ: 'NIE',
        tresc: 'Musisz wybrać wyzwanie',
        kara: 1
      }
      setQuestion(tablica) // Przekazanie propsów do karty
      setIsRenderedQuestion(true) // Zmienia aby karta mogła się pojawić
      console.log('Musisz wybyrać wyzwanie!');
      return
    }

    // Jeżeli może wybrać pytanie
    setIsDisabled(false)
    drawQuestion(index, player)
  }

  const handleChallegne = async (index) => {
    const choosenPlayer = await selectPlayer()
    try {
      await axios.patch('/api/v1/players/' + choosenPlayer._id, { questionValue: 0 })
      setIsDisabled(false)
    } catch (error) {
      console.log(error);
    }
    drawDare(index, choosenPlayer)
  }



  // Zwiększa licznikREF, czyli indeks aktualnego gracza oraz zwraca tablice z tym graczem
  const selectPlayer = async () => {
    if (licznikRef.current >= players.length) {
      incrementLicznik(0)
    }
    const zmienna = await getPlayers()
    const choosenPlayer = zmienna[licznikRef.current]
    console.log('wybraniec: ' + choosenPlayer.playerName);
    return choosenPlayer
  }

  const getPlayers = async () => {
    try {
      const respond = await axios.get('/api/v1/players')
      const fetchedPlayers = respond.data.players
      setPlayers(fetchedPlayers)
      return fetchedPlayers
    } catch (error) {
      console.error('Wystapil blad:', error)
    }
  }

  // const cloneCollection = async () => {
  //   try {
  //     const response = await axios.get('/api/v1/cloneData')
  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.log('blad' + error);
  //   }
  // }






  const drawQuestion = async (index, player) => {
    try {
      // Zebranie pytania z bazy danych i wysłanie propsów do karty i wyświetlenie gracza nad kartą
      const response = await axios.get('/api/v1/game/draw/?typ=Prawda')
      const question = response.data.card[0]
      console.log(response.data.card[0]);
      setQuestion(question)
      setIsRenderedQuestion(true)
      setIsRenderedChallenge(false)
      setSelectedPlayer(player.playerName)
      // Zmniejszenie ilosci pytania w bazie danych
      const value = response.data.card[0].ilosc
      await axios.patch('/api/v1/game/' + question._id, { ilosc: (value - 1) })

      // Dodanie questionValue graczoi
      const questionValue = player.questionValue
      await axios.patch('/api/v1/players/' + player._id, { questionValue: (questionValue + 1) })
      incrementLicznik()

    } catch (error) {
      console.log(error);
    }
  }

  const drawDare = async (index, player) => {
    try {
      const response = await axios.get('/api/v1/game/draw?typ=Wyzwanie')
      const challenge = response.data.card[0]
      console.log(challenge);
      setChallenge(challenge)
      setIsRenderedQuestion(false)
      setIsRenderedChallenge(true)
      setSelectedPlayer(player.playerName)
      // Zmniejszenie ilosci wyzwania w bazie danych
      const value = challenge.ilosc
      await axios.patch('/api/v1/game/' + challenge._id, { ilosc: (value - 1) })
      console.log('nowa ilosc: ' + (value - 1));
      // Wyzerowanie questionValue graczoi
      await axios.patch('/api/v1/players/' + player._id, { questionValue: 0 })
      incrementLicznik()

    } catch (error) {
      if (error.response.status === 404) {
        console.log("404");
      }
      console.log(error);
    }
  }


  useEffect(() => {
    getPlayers()
    const tab = {
      typ: 'Nowa gra',
      kara: 3,
      tresc: 'wybierz PYTANIE czy WYZWANIE'
    }
    setQuestion(tab)
    setIsRenderedQuestion(true)
  }, [])






  return (
    <div className="container-Card">
      <h3>{selectedPlayer}</h3>
      {isRenderedQuestion && <Card type={question.typ} contentText={question.tresc} kara={question.kara} />}
      {isRenderedChallenge && <Card type={challenge.typ} contentText={challenge.tresc} kara={challenge.kara} />}

      <div className="buttons-main">
        <button className={isDisabled ? 'disabled-question-button' : 'question-button'} disabled={isDisabled} onClick={() => handleQuestion(licznikRef)}>Pytanie</button>
        <button className='challenge-button' onClick={() => handleChallegne(licznikRef)}>Wyzwanie</button>
        <br />
      </div>

    </div>
  )
}

export default MainGame