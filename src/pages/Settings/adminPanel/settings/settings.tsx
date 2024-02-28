import ContainerApp from '@/components/ui/containerApp'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const Settings = () => {
  return (
    <ContainerApp title='Ustawienia' display={true}>
      <div className='flex gap-4'>
        <Card className='w-[300px]'>
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
        </Card>

        <Card className='w-[300px]'>
          <CardHeader>
            <CardTitle>Konwertowanie do PDF</CardTitle>
            <CardDescription>W tym panelu przekonwertujesz stworzone karty do formatu pdf, gotowe do wydruku!</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button >
              Przejdź
              <ChevronRight />
            </Button>
          </CardFooter>
        </Card>
      </div>

      
    </ContainerApp>
  )
}

export default Settings