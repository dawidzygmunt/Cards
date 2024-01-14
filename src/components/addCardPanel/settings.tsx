import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './settings.css'
import vodka from '../../assets/vodka.png'
import NavbarMine from '../navbar';
import axios from 'axios';



function AddCardPanel() {




  const [typeText, setTypeText] = useState('');
  const [versionText, seVersionText] = useState('');
  const [iterText, setIterText] = useState();
  const [contentText, setcontentText] = useState('');
  const [vodkaShot, setVodkaShot] = useState();

  useEffect(() => {
    setTypeText('Prawda');
    seVersionText('SpicyV_1')
    setIterText(1)
    setVodkaShot(1)
  }, []);


  const handlev1 = (event) => {
    const { value } = event.target;
    setTypeText(value);
    console.log(value);
  }

  const handlev2 = (event) => {
    const { value } = event.target;
    seVersionText(value);
    console.log(value);
  }

  const handlev3 = (event) => {
    const { value } = event.target;
    setIterText(value);
    console.log(value);
  }

  const handlev4 = (event) => {
    const { value } = event.target;
    setcontentText(value);
    console.log(value);
  }





  const handleVodka1 = (event) => {
    const { value } = event.target;
    setVodkaShot(1);
    console.log(vodkaShot);
  }
  const handleVodka2 = (event) => {
    const { value } = event.target;
    setVodkaShot(2);
    console.log(vodkaShot);
  }
  const handleVodka3 = (event) => {
    const { value } = event.target;
    setVodkaShot(3);
    console.log(vodkaShot);
  }


  useEffect(() => {
    const button1 = document.getElementById('button1')
    const button2 = document.getElementById('button2')
    const button3 = document.getElementById('button3')

    if (vodkaShot === 1) {
      button1.style.backgroundColor = "#cf7171"
      button2.style.backgroundColor = "#ebb78d"
      button3.style.backgroundColor = "#ebb78d"
    }

    if (vodkaShot === 2) {
      button2.style.backgroundColor = "#cf7171"
      button3.style.backgroundColor = "#ebb78d"
    }

    if (vodkaShot === 3) {
      button1.style.backgroundColor = "#cf7171"
      button2.style.backgroundColor = "#cf7171"
      button3.style.backgroundColor = "#cf7171"
    }
  })


  useEffect(() => {
    const vodka1 = document.getElementById('vodka-card1')
    const vodka2 = document.getElementById('vodka-card2')
    const vodka3 = document.getElementById('vodka-card3')

    if (vodkaShot === 1) {
      vodka1.style.display = "none"
      vodka2.style.display = "none"
      vodka3.style.display = "flex"
    }

    if (vodkaShot === 2) {
      vodka1.style.display = "none"
      vodka2.style.display = "flex"
      vodka3.style.display = "flex"
    }

    if (vodkaShot === 3) {
      vodka1.style.display = "flex"
      vodka2.style.display = "flex"
      vodka3.style.display = "flex"
    }
  })


  useEffect(() => {
    const card = document.getElementById('card')

    if (typeText === 'Wyzwanie') {
      card.style.backgroundColor = "black"
      card.style.color = "white"

    }

    if (typeText === 'Prawda') {
      card.style.backgroundColor = "white"
      card.style.color = "black"
    }

  })

  const allInputData = {
    tresc: contentText,
    typ: typeText,
    ilosc: iterText,
    kara: vodkaShot
  }


  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/v1/cards', allInputData)
      console.log('Odpowiedź serwera:', response.data);
    } catch (error) {
      console.error('Błąd:', error);
    }




    // try {
    //   const response = await axios.post('/api/v1/cards', {})
    //   console.log('Odpowiedź serwera:', response.data);
    // } catch (error) {
    //   console.error('Błąd:', error);
    // }
  }



  return (
    <div className="container-settings">
      <NavbarMine />



      <Row>
        <Col lg="5" className='left '>
          <div className='main-frame'>
            <form className="card-form">
              <select className='test1337' id="" value={typeText} onChange={handlev1} name='typ'>
                <option value="Prawda" className='test1337'>Prawda</option>
                <option value="Wyzwanie" className='test1337'>Wyzwanie</option>
              </select>

              <div>
                <label htmlFor="">Wersja</label>
                <br />
                <input type="text" value={versionText} className='formInput' name='wersja' disabled />
              </div>

              <div>
                <label htmlFor="">Ilość powtórzeń</label>
                <br />
                <input type="number" value={iterText} onChange={handlev3} className='formInput' name='ilosc' />
              </div>

              <div>
                <label htmlFor="">Treść</label> <br />
                <textarea name="tresc" value={contentText} onChange={handlev4}
                  className='formInput content' cols="20" rows="10">
                </textarea>

                <input onClick={handleSubmit} value='Zatwierdź' className='submitButton' type='submit' />
              </div>

            </form>
          </div>


        </Col>

        <Col lg="7" className='right'>
          <div className='card' id='card'>
            <div className='card-type'>
              <h1>{typeText}</h1>
            </div>
            <div className='card-wrapper'>
              <div className='card-content'>
                {contentText}
              </div>
            </div>
            <div className='card-version'>
              <h5>{versionText}</h5>
            </div>
            <div className='vodka'>
              <img src={vodka} alt="vodka" id='vodka-card1' />
              <img src={vodka} alt="vodka" id='vodka-card2' />
              <img src={vodka} alt="vodka" id='vodka-card3' />
            </div>



          </div>


          <div className='options'>
            <button id='button1' className='image-button' onClick={handleVodka1}>
              <img src={vodka} alt="" />
            </button>
            <button id='button2' className='image-button' onClick={handleVodka2}>
              <img src={vodka} alt="" />
            </button>
            <button id='button3' className='image-button' onClick={handleVodka3}>
              <img src={vodka} alt="" />
            </button>

          </div>
        </Col>
      </Row>


      <div className='footer'>
        <span>Tutaj będzie footer</span>
      </div>


      <script src=".\browser-app.js"></script>






    </div>



  )
}






export default AddCardPanel;
