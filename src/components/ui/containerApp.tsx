import SideNavbar from "../navbar/sideNavbar"


interface ContainerAppProps {
  children: React.ReactNode,
  title: string
}


const ContainerApp: React.FC<ContainerAppProps> = ({
  children,
  title
}) => {
  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex-1">
        <div className="text-5xl font-medium text-left mb-10 w-full">
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}

export default ContainerApp