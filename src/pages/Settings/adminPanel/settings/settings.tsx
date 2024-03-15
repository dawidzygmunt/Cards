import ContainerApp from '@/components/ui/containerApp'
import Card from "@/components/gameMain/card"
import {
  Card as CardComponent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Card as CardType } from 'types'
import axios from 'axios'




// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
// const zmienne = () => {
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(false);
//   return (
//     <div></div>
//   )
// }


// // Create Document Component
// const MyDocument = () => (

//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         {/* {cards.map((card: CardType) => (
//           <div key={card._id}>
//           <Card data={card} key={card._id} />
//           </div>
//         ))} */}
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );


const Settings = () => {
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

  const MyDocument = () => (

    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <div className='flex flex-1 gap-3 flex-wrap'>
            {cards.map((card: CardType) => (
              <div key={card._id}>
                <Card data={card} key={card._id} />
              </div>
            ))}
          </div>
        </View>
      </Page>
    </Document>
  );

  return (
    <ContainerApp title='Ustawienia' display={true}>
      <div className='flex gap-4'>
        <CardComponent className='w-[300px]'>
          <CardHeader>
            <CardTitle>Przypisanie Kolekcji</CardTitle>
            <CardDescription>Sprawdź, które karty nie mają przypisanej kolekcji a następnie przypisz konkretne karty z gry Prawda czy Wyzwanie do kolekcji</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>
              Przejdź
              <ChevronRight />
            </Button>
          </CardFooter>
        </CardComponent>

        <CardComponent className='w-[300px]'>
          <CardHeader>
            <CardTitle>Konwertowanie do PDF</CardTitle>
            <CardDescription>W tym panelu przekonwertujesz stworzone karty do formatu pdf, gotowe do wydruku!</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => ReactDOM.render(<MyDocument />, document.getElementById('root'))}>
              Przejdź
              <ChevronRight />
            </Button>
          </CardFooter>
        </CardComponent>
      </div>


    </ContainerApp >
  )
}

export default Settings