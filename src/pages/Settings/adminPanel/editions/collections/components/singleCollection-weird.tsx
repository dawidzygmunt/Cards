import ContainerApp from "@/components/ui/containerApp"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


interface Collection {
  nazwa: string,
  cena: number,
  _id: string,
}

const SingleCollection = () => {
  const { id } = useParams()
  const [data, setData] = useState<Collection | null>(null)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/v1/collections/${id}`)
      console.log(response.data.collections);
      setData(response.data.collections)
    }

    getData()
  }, [id])

  if (!data) return <div>Loading...</div>

  return (
    <ContainerApp title={data.nazwa} display={true}>
      <div>{data.nazwa}</div>
      <div></div>
    </ContainerApp>
  )
}

export default SingleCollection