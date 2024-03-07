import ContainerApp from "@/components/ui/containerApp";
import * as z from "zod"
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
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CardBasic from "@/components/card-basic";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card";

import { toast } from "react-hot-toast";

import { Textarea } from "@/components/ui/textarea"





const formSchema = z.object({
  typ: z.string().min(2, {
    message: "Wybierz typ karty",
  }),
  wersja: z.string().min(2, {
    message: "Wybierz wersję karty",
  }),
  ilosc: z.coerce.number().min(1, {
    message: "Wybierz ilość powtórzeń",
  }),
  tresc: z.string().min(5, {
    message: "Wpisz treść karty",
  }),
  kara: z.string().min(1, {
    message: "Wybierz karę",
  }),

})


const AdminNewCard = () => {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typ: "Prawda",
      wersja: "Classic",
      ilosc: 1,
      tresc: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const data = form.getValues();
      await axios.post('/api/v1/cards/', data)
      toast.success("Dodano kartę")
      form.reset()

    } catch (error) {
      toast.error("Nie udało się dodać karty")
    }
  }




  return (
    <ContainerApp title="Dodaj Kartę" display={true}>
      <div className="flex gap-4">
        <div className='flex flex-col min-w-[800px] xl:px-20 xl:pr-40'>
          <Card>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="typ"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full flex text-black font-bold my-2 mt-7 text-2xl justify-center ">
                              <SelectValue placeholder="Prawda" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Prawda">Prawda</SelectItem>
                            <SelectItem value="Wyzwanie">Wyzwanie</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wersja"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex ">
                          Wersja
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-[180px] text-black">
                              <SelectValue placeholder="Classic" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Classic">Classic</SelectItem>
                            <SelectItem value="Spicy">Spicy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ilosc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex">
                          Ilość powtórzeń
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="w-[180px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tresc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex ">Treść</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Wpisz tutaj treść zadania lub pytania"
                            className="resize-y min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="absolute bottom-20 right-20">
                    <FormField
                      control={form.control}
                      name="kara"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Notify me about...</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="1" />
                                </FormControl>
                                {/* <FormLabel className="font-normal">
                                All new messages
                              </FormLabel> */}
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="2" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Direct messages and mentions
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="3" />
                                </FormControl>
                                <FormLabel className="font-normal">Nothing</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="flex w-[40%] justify-center">
          <CardBasic data={form.watch()} />
        </div>

      </div>
    </ContainerApp>
  )
}

export default AdminNewCard