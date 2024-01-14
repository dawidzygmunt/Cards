interface AnalysticTileProps {
  title: string,
  amount: number,
  percentage: string
}

const AnalysticTile: React.FC<AnalysticTileProps> = ({
  title,
  amount,
  percentage
}) => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-lg hover:shadow-none duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <div className="text-black">
          <h3 className="ml-3">{title}</h3>
          <h1>{amount}</h1>
        </div>
        <div className="relative w-[92px] h-[92px] rounded-[50%]">
          <svg className="w-28 h-28" >
            <circle cx='38' cy="38" r='36' className="fill-none stroke-[10] translate-x-1 translate-y-1 stroke-green-700"></circle>
          </svg>
          <div className="percentage">
            <p>{percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysticTile;