import { useState } from "react"
import axios from "axios"
import { Button } from "../ui/button"
import toast from "react-hot-toast"

interface SinglePlayerProps {
  playerName: string
  playerID: string
}

const SinglePlayer: React.FC<SinglePlayerProps> = ({
  playerName,
  playerID
}) => {

  const [shouldHide, setShouldHide] = useState(false)


  // delete player
  const handleDeleteButton = async () => {
    const response = await axios.delete('/api/v1/players/' + playerID)
    if (!response) {
      toast.error('Wystąpił błąd')
    }
    else {
      setShouldHide(true)
    }
  }


  return (
    <div className="container">
      <div className="flex justify-between items-center border-2 border-black rounded-lg m-2 p-2 w-full min-w-[400px]" style={{ display: shouldHide ? 'none' : 'flex' }}>
        <h3 className="ml-2">{playerName}</h3>
        <span>
          <Button variant="destructive" size="sm" className="mx-1" onClick={handleDeleteButton}>
            Usuń
          </Button>
        </span>
      </div>
    </div>
  )
}

export default SinglePlayer