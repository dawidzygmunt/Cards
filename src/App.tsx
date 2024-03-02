import './assets/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './pages/mainMenu'
import NewGame from './pages/NewGame/newGame';
import AdminPanel from './pages/Settings/adminPanel/homePage/adminPanel';
import Credits from './pages/Credits/credits';
import AdminNewCard from './pages/Settings/adminPanel/newCard/addCard';
import Statistics from './pages/Settings/adminPanel/analyse/statistics';
import SearchAllCards from './pages/Settings/adminPanel/AllCards/allCard';
// import AdminSingleCard from './pages/Settings/adminPanel/AllCards/adminSignleCard';
import Users from './pages/Settings/adminPanel/users/users';
import Messages from './pages/Settings/adminPanel/messages/messages';
import Tickets from './pages/Settings/adminPanel/tickets/tickets';
import Settings from './pages/Settings/adminPanel/settings/settings';
import CardEditions from './pages/Settings/adminPanel/editions/page';

import ToastProvider from './../providers/toast-provider'
import TruthOrDareGame from './components/gameMain/main';
import CreateEdition from './pages/Settings/adminPanel/editions/components/createEdition';
import GameCollection from './pages/Settings/adminPanel/editions/collections/page';
import CreateCollection from './pages/Settings/adminPanel/editions/collections/components/createCollection';



const App = () => {

  return (
    <div className=''>
      <ToastProvider />

      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<MainMenu />}></Route>
          <Route path='/newGame' element={<NewGame />}></Route>
          <Route path='/main' element={<TruthOrDareGame />}></Route>
          <Route path='/admin/dashboard' element={<AdminPanel />}></Route>
          <Route path='/credits' element={<Credits />}></Route>

          <Route path='/admin/new-card' element={<AdminNewCard />}></Route>
          <Route path='/admin/statistics' element={<Statistics />}></Route>
          <Route path='/admin/users' element={<Users />}></Route>

          <Route path='/admin/editions' element={<CardEditions />}></Route>
          <Route path='/admin/editions/:id' element={<GameCollection />}></Route>
          <Route path='/admin/editions/add' element={<CreateEdition />}></Route>
          <Route path='/admin/collections/add/:id' element={<CreateCollection />}></Route>

          <Route path='/admin/all-cards' element={<SearchAllCards />}></Route>
          {/* <Route path='/admin/edit-single/:info' element={<AdminSingleCard />}></Route> */}
          <Route path='/admin/new-card' element={<AdminNewCard />}></Route>
          <Route path='/admin/messages' element={<Messages />}></Route>
          <Route path='/admin/tickets' element={<Tickets />}></Route>
          <Route path='/admin/settings' element={<Settings />}></Route>
          <Route path='/admin/logout' element={<MainMenu />}></Route>


        </Routes>
      </Router>
    </div>
  )
}

export default App