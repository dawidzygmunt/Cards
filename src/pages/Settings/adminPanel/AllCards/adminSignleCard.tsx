
import { Card } from '@/../types'


interface AdminSingleCardProps {
  data: Card
}


const AdminSingleCard: React.FC<AdminSingleCardProps> = ({
  data
}) => {
  return (
    <div>
      {data.kara}
    </div>
  )
}

export default AdminSingleCard