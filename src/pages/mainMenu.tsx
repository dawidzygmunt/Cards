import { useNavigate } from 'react-router-dom'
import './menu.css'



const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="container-main-menu">
      <div id='menu-header'>
        <h1>PRIMO</h1>
        <h3>PRAWDA CHODZI BOSO</h3>
      </div>
      <div id='main-menu'>
        <ul>
          <li><button onClick={() => navigate('/newGame')}>Nowa gra</button></li>
          <li><button onClick={() => navigate('/main')}>Kontynuj</button></li>
          <li><button onClick={() => navigate('/admin/dashboard')}>Ustawienia</button></li>
          <li><button onClick={() => navigate('/credits')}>Credits</button></li>

        </ul>
      </div>
    </div>
  )
}

export default MainMenu
