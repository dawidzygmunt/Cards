export interface Card {
  _id: string,
  tresc: string,
  typ: string,
  ilosc: number,
  kara: number,
  wersja: string | null
}

export interface Player {
  _id: string,
  playerName: string,
  questionValue: number
}