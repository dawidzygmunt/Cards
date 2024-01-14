import { cn } from "../../../lib/utils"
import { Link, useResolvedPath, useMatch } from "react-router-dom"

const AsideSingleItem = (props) => {
  const resolvedPath = useResolvedPath(props.path)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <Link to={props.path}>
      <div className={cn(
        `flex items-center align-middle p-4 text-black hover:translate-x-1 duration-300 ease-in-out group 
          ${isActive ? "text-blue-900" : ""} ${props.className ?? ''}`
      )}
      >
        <span className="group-hover:translate-x-2 duration-300 ease-in-out">{props.icon}</span>
        <span className="ml-4">{props.title}</span>
      </div>
    </Link>
  )
}

export default AsideSingleItem