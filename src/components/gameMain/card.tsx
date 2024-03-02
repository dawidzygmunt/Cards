import './card.css'
import { Card as CardType } from 'types';

interface CardProps {
  data: CardType
}

const Card: React.FC<CardProps> = ({
  data
}) => {

  const versionText = 'Classic'



  return (
    <div className='flex' key={data._id}>
      <div className='card shadow-xl w-[250px] h-[300px] border border-black rounded-lg relative'>
        <div className='font-bold text-4xl mb-4'>
          <h1>{data.typ}</h1>
        </div>
        <div className='card-wrapper'>
          <div className='card-content'>
            {data.tresc}
          </div>
        </div>
        <div className=''>
          <h5 className='absolute bottom-1 left-1'>{versionText}</h5>
        </div>
        <div className='vodka'>
          {data.kara}
        </div>
      </div>
    </div>
  )
}

export default Card