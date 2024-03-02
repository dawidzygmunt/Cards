import { useNavigate } from 'react-router-dom'

import AsideSingleItem from './asideComponent'
import { LuLayoutDashboard, LuUser, LuLogOut, LuSettings } from 'react-icons/lu'
import { MdReportGmailerrorred } from 'react-icons/md'
import { AiOutlineMail, AiOutlinePlus } from 'react-icons/ai'
import { IoAnalyticsOutline } from 'react-icons/io5'
import { CgCardHearts } from 'react-icons/cg'
import { LibraryBig } from 'lucide-react'




function SideNavbar() {

  const navigate = useNavigate()


  return (
    <aside className='w-[220px] h-[93vh] flex'>
      <div className="fixed left-0 top-0">
        <div className="flex m-4 hover:cursor-pointer" onClick={() => navigate('/')}>
          <img src='logo.png' alt="logo" className='w-[40px] h-[50px] mr-3' />
          <h2 className='font-bold text-2xl'>
            Karty
            <span className="text-red-500">Party</span>
          </h2>
        </div>
        <div className="flex flex-col bg-white mx-5 rounded-xl font-bold relative h-[88vh] shadow-2xl">
          <div className=''>
            <AsideSingleItem icon={<LuLayoutDashboard />} title='Strona główna' path='/admin/dashboard' />
            <AsideSingleItem icon={<LuUser />} title='Użytkownicy' path='/admin/users' />
            <AsideSingleItem icon={<IoAnalyticsOutline />} title='Statystyki' path='/admin/statistics' />
            <AsideSingleItem icon={<LibraryBig />} title='Edycje' path='/admin/editions' />
            <AsideSingleItem icon={<CgCardHearts />} title='Przeglądaj' path='/admin/all-cards' />
            <AsideSingleItem icon={<AiOutlinePlus />} title='Dodaj nowe' path='/admin/new-card' />
            <AsideSingleItem icon={<AiOutlineMail />} title='Wiadomości' path='/admin/messages' />
            <AsideSingleItem icon={<MdReportGmailerrorred />} title='Zgłoszenia' path='/admin/tickets' />
            <AsideSingleItem icon={<LuSettings />} title='Ustawienia' path='/admin/settings' />
            <AsideSingleItem icon={<LuLogOut />} title='Wyloguj się' path='/admin/logout' className='text-red-500 absolute bottom-8' />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SideNavbar