

interface CardBasicProps {
  data: {
    typ: string;
    wersja: string;
    ilosc: number;
    tresc: string;
    kara: string;
  };
}

const CardBasic: React.FC<CardBasicProps> = ({
  data
}) => {
  return (
    <div className='flex'>
      <div className='card shadow-xl w-[250px] h-[350px] rounded-lg relative border-black border-[1px]'>
        <div className='font-bold text-4xl mb-4'>
          <h1>{data.typ}</h1>
        </div>
        <div className='card-wrapper'>
          <div className='card-content'>
            {data.tresc}
          </div>
        </div>
        <div className=''>
          <h5 className='absolute bottom-1 left-1'>{data.wersja}</h5>
        </div>
        <div className='vodka'>
          {data.kara}
        </div>
      </div>
    </div>
  )
}

export default CardBasic