import './App.css';
import Container from './components/Container';
import Header from './components/Header';
import Context from './components/Context/Context';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './Routes';
import Modal from './components/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [shoppingCart, setShoppingCart] = useState([])
  const [favorites, setfavorites] = useState([])
  const [movieNameSearch, setmovieNameSearch] = useState('')
  const [showModal, setShowModal] = useState({show: false, name:''})
  const [genres, setGenres] = useState([])
  const [token, setToken] = useState('')


  return (
    <Context.Provider value={{shoppingCart: [shoppingCart, setShoppingCart], favorites: [favorites, setfavorites], movieNameSearch:[movieNameSearch, setmovieNameSearch], showModal: [showModal, setShowModal], genres: [genres, setGenres], token: [token, setToken]}}>
      <Container>
        <BrowserRouter>
          <Header/>
          <MyRoutes/>

        {showModal.show &&
          <Modal name={showModal.name}/>
        }
        <ToastContainer position="top-left"/>
        </BrowserRouter>
      </Container>
    </Context.Provider>
    )
}

export default App;
