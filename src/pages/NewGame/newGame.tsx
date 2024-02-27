import { useEffect, useState } from 'react'
import axios from "axios"
import SinglePlayer from '../../components/newGame/single-player'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { on } from 'events'


interface Player {
  _id: string,
  playerName: string,
}


const formSchema = z.object({
  playerName: z.string().min(3, {
    message: "Nazwa musi mieć conajmniej 3 znaki",
  }
  ).max(12, {
    message: "Maksymalna długość to 12 znaków"
  }),
})



const NewGame = () => {
  const [players, setPlayers] = useState<Player[]>([])

  const cloneCollection = async () => {
    try {
      const response = await axios.get('/api/v1/cloneData')
      console.log(response.data.message);
    } catch (error) {
      console.log('blad' + error);
    }
  }

  const goMainButtonHandle: React.MouseEventHandler = () => {
    cloneCollection()
    navigate('/main')
  }


  const showPlayers = async () => {
    try {
      const respond = await axios.get('/api/v1/players')
      const fetchedPlayers = respond.data.players;
      setPlayers(fetchedPlayers)
      console.log(fetchedPlayers);
    } catch (error) {
      toast.error('Wystapil blad')
    }
  }

  useEffect(() => {
    showPlayers()
  }, [])



  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    try {
      await axios.post('/api/v1/players', { ...form.getValues() })
      showPlayers()
    } catch (error) {
      toast.error('Wystapil blad')
    }
  }

  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='bg-white shadow-xl px-10 py-4 pb-6 rounded-md'>
        <h3>Nazwa Gracza</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex">
            <div className='flex items-center justify-center'>
              <FormField
                control={form.control}
                name="playerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> </FormLabel>
                    <FormControl>
                      <Input placeholder="np. Tomek" {...field} className='min-w-[250px]' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='ml-3 mt-[7px]'>Dodaj</Button>
            </div>
          </form>
        </Form>
      </div>

      <div className='flex flex-col mt-20'>
        {players.map((player) => (
          <SinglePlayer key={player._id} playerID={player._id} playerName={player.playerName} />
        ))}
      </div>
      <div>
        <Button
          className='mx-1'
          onClick={() => navigate('/')}
        >
          Wróć
        </Button>

        <Button
          className='mx-1'
          onClick={goMainButtonHandle}
        >
          Dalej
        </Button>
      </div>


    </div>
  )



}

export default NewGame;