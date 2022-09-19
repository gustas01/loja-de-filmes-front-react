import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import Context from './components/Context/Context';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './Routes';
import Modal from './components/Modal';

function App() {
  const [shoppingCart, setShoppingCart] = useState([])
  const [favorites, setfavorites] = useState([])
  const [movieNameSearch, setmovieNameSearch] = useState('')
  const [showModal, setShowModal] = useState({show: false, name:''})
  const [darkModeStatus, setDarkModeStatus] = useState(true)

  return (
    <Context.Provider value={{shoppingCart: [shoppingCart, setShoppingCart], favorites: [favorites, setfavorites], movieNameSearch:[movieNameSearch, setmovieNameSearch], showModal: [showModal, setShowModal], darkMode: [darkModeStatus, setDarkModeStatus]}}>
      <Container>
        <Header/>
        <BrowserRouter>
          <MyRoutes/>

        {showModal.show &&
          <Modal name={showModal.name}/>
        }
        </BrowserRouter>
      </Container>
    </Context.Provider>
    )
}

export default App;
