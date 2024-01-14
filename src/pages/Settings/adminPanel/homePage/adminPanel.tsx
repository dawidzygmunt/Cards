import { useEffect, useState } from "react"
import AnalysticTile from "./analysticComponent"
import axios from "axios"
import ContainerApp from "@/components/ui/containerApp"





const AdminPanel = () => {
  const [allBasic, setAllBasic] = useState<number>()
  const [truthBasic, setTruthBasic] = useState<number>()
  const [challengeBasic, setChallengeBasic] = useState<number>()
  const [all, setAll] = useState<number>()
  const [truth, setTruth] = useState<number>()
  const [challenge, setChallenge] = useState<number>()

  const allCardsBasic = async () => {
    const response = await axios.get('/api/v1/statistics/all-basic')
    console.log(response.data.nbHits);
    setAllBasic(response.data.nbHits)
  }

  const truthCardsBasic = async () => {
    const response = await axios.get('/api/v1/statistics/truth-basic')
    console.log(response.data.nbHits);
    setTruthBasic(response.data.nbHits)
  }

  const challengeCardsBasic = async () => {
    const response = await axios.get('/api/v1/statistics/challenge-basic')
    console.log(response.data.nbHits);
    setChallengeBasic(response.data.nbHits)
  }

  const allCards = async () => {
    const response = await axios.get('/api/v1/statistics/all')
    console.log(response.data.nbHits);
    setAll(response.data.nbHits)
  }

  const truthCards = async () => {
    const response = await axios.get('/api/v1/statistics/truth')
    console.log(response.data.nbHits);
    setTruth(response.data.nbHits)
  }

  const challengeCards = async () => {
    const response = await axios.get('/api/v1/statistics/challenge')
    console.log(response.data.nbHits);
    setChallenge(response.data.nbHits)
  }


  useEffect(() => {
    allCardsBasic()
    truthCardsBasic()
    challengeCardsBasic()
    allCards()
    truthCards()
    challengeCards()
  }, [])


  return (
    <ContainerApp title="Statystyki">
      <div className="flex">
      <div className="grid grid-cols-3 gap-6">
        <AnalysticTile title='Wszystkich kart' amount={allBasic as number} percentage='100' />
        <AnalysticTile title='Pytania' amount={truthBasic as number} percentage='57' />
        <AnalysticTile title='Wyzwania' amount={challengeBasic as number} percentage='87' />

        <AnalysticTile title='Wszystkie z powt' amount={all as number} percentage='98' />
        <AnalysticTile title='Pytań z powt' amount={truth as number} percentage='57' />
        <AnalysticTile title='Wyzwań z powt' amount={challenge as number} percentage='87' />
      </div>




      </div>
    </ContainerApp>
  )
}

export default AdminPanel