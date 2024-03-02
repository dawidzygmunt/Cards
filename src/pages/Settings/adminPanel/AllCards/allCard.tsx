
import ContainerApp from "@/components/ui/containerApp"
import Card from "@/components/gameMain/card"
import axios from "axios"
import { useState, useEffect } from "react"

import { Card as CardType } from "types"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"




const SearchAllCards = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/cards?page=1");
        setCards(response.data.cards);
        setLoading(false); // Ustawiamy loading na false po pomyślnym pobraniu danych
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
        setLoading(false); // Ustawiamy loading na false w przypadku błędu
      }
    };

    fetchData();
  }, []);


  const handlePrevious = async () => {
    if (currentPage === 1) {
      return
    }
    const response = await axios.get("/api/v1/cards?page=" + (currentPage - 1).toString())
    setCurrentPage(currentPage - 1)
    setCards(response.data.cards)
  }

  const handleNext = async () => {
    const response = await axios.get("/api/v1/cards?page=" + (currentPage + 1).toString())
    setCurrentPage(currentPage + 1)
    setCards(response.data.cards)
    console.log(cards);
    console.log("Strona: " + currentPage);
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <ContainerApp title="cards" display={false}>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <Input placeholder="Search" />
          <Pagination className="flex justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={handlePrevious} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={handleNext} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <ScrollArea className="p-4 w-full h-[88vh]">
          <div className="flex justify-center gap-10 flex-wrap border rounded-lg p-5">
            {cards.map((card: CardType) => (
              <div key={card._id}>
                <Card data={card} key={card._id} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </ContainerApp >
  )
}

export default SearchAllCards