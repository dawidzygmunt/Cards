export interface Card {
  id: string,
  tresc: string,
  typ: string,
  ilosc: number,
  kara: number,
  wersja: string | null
}

export interface Player {
  id: string,
  playerName: string,
  questionValue: number
}