
import ContainerApp from "@/components/ui/containerApp"
import Card from "@/components/gameMain/card"
import axios from "axios"
import { Card as CardType } from "types"

const response = await axios.get("/api/v1/cards")
const cards = response.data.cards
console.log(cards);


const SearchAllCards = () => {
  return (
    <ContainerApp title="Wszystkie Karty">
      <div className="flex">
        <div className="flex gap-10 flex-wrap">
          {cards.map((card: CardType) => (
            <div>
              <Card data={card} key={card.id} />
            </div>
          ))}

        </div>
      </div>
    </ContainerApp>
  )
}

export default SearchAllCards