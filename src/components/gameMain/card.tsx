import { useState } from 'react';
import './card.css'
import { Card as CardType } from 'types';

interface CardProps {
  data: CardType
}

const Card: React.FC<CardProps> = ({
  data
}) => {

  const versionText = 'Classic'

  const [isHovered, setIsHovered] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isChallenge, setIsChallenge] = useState(null);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  const stylized = isHovered ? 'card-cover-active' : 'card-cover-normal'

  return (
    <div className='flex'>
      <div className='card shadow-xl w-[250px] h-[350px] rounded-lg relative' onClick={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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