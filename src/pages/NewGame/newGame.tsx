import { useEffect, useState } from 'react'
import styles from './newGame.module.css'
import axios from "axios"
import SinglePlayer from '../../components/newGame/single-player'



const NewGame = () => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState('')
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setLoading('Ładowanie....')
  }, [])




  const cloneCollection = async () => {
    try {
      const response = await axios.get('/api/v1/cloneData')
      console.log(response.data.message);
    } catch (error) {
      console.log('blad' + error);
    }
  }


  const handleInputValue = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue) {
      alert("Podaj Imie!")
    }
    else {
      const allInputData = {
        playerName: inputValue
      }
      try {
        await axios.post('/api/v1/players', allInputData)
        showPlayers()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const showPlayers = async () => {
    try {
      const respond = await axios.get('/api/v1/players')
      const fetchedPlayers = respond.data.players;
      setPlayers(fetchedPlayers)
      setLoading('')
    } catch (error) {
      console.error('Wystapil blad:', error)
      setLoading('')
    }
  }

  useEffect(() => {
    showPlayers()
    cloneCollection()

  }, [])




  return (
    <div className={styles["new-Game-Container"]} >
      <form className={styles['player-form']}>
        <h4>Gracze</h4>
        <div className={styles["form-control"]}>
          <input type="text" className={styles["player-input"]} value={inputValue} onChange={handleInputValue} placeholder="np. Tomek" />
          <button type="submit" onClick={handleSubmit} className={styles["submit-btn"]}>Dodaj</button>
        </div>
        <div className={styles["form-alert"]}></div>
      </form>
      <section className={styles["players-container"]}>
        <div>
          {players !== undefined && players.map((player) => (
            <SinglePlayer key={player._id} playerName={player.playerName} playerID={player._id} />
          ))}
        </div>
        <p className={styles["loading-text"]}>{loading}</p>
        <div className={styles["players"]}></div>
        <div className={styles['next-btn-section']}>
          <a href="/cards"><button className={styles['back-btn']}>Wróć</button></a>
          <a href="/cards/main"><button className={styles['next-btn']}>Przejdź dalej</button></a>
        </div>
      </section>
    </div>
  )



}

export default NewGame;