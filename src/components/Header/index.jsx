import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { AiFillHeart } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import NotificationBadge from 'react-notification-badge';

import './style.css'
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Context from "../Context/Context";

import UserMenu from "../UserMenu";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  const [, setmovieNameSearch] = useContext(Context).movieNameSearch
  const [shoppingCart, ] = useContext(Context).shoppingCart
  const [favorites, ] = useContext(Context).favorites
  const [, setGenres] = useContext(Context).genres
  const [lightModeStatus, setLightModeStatus] = useState(false)
  const [cartLength, setCartLength] = useState(0)
  const [favoritesLength, setFavoritesLength] = useState(0)
  const [inputText, setInputText] = useState('')
  const [token] = useState('a')

  const navigate = useNavigate()

  function handleGetMovieName(e){
    setInputText(e.target.value)
  }

  function searchMovies(){
    setmovieNameSearch(inputText);
    navigate('/')
  }

  function darkMode(){
    document.body.classList.toggle('light-mode')
    localStorage.setItem('light-mode', !lightModeStatus)
    setLightModeStatus(!lightModeStatus)
  }

  function showHideCart(){
    if(document.getElementById('sideNavFavoritesContainer').classList.contains('showHideFavorites')){
      document.getElementById('sideNavFavoritesContainer').classList.remove('showHideFavorites')
    }
    document.getElementById('sideNavCartContainer').classList.toggle('showHideCart')
  }

  function showHideFavorites(){
    if(document.getElementById('sideNavCartContainer').classList.contains('showHideCart')){
      document.getElementById('sideNavCartContainer').classList.remove('showHideCart')
    }
    document.getElementById('sideNavFavoritesContainer').classList.toggle('showHideFavorites')
  }


  const getGenres = useCallback(async () => {
    try{
      const url = `http://localhost:3001/genres`
      const genresMovies = await fetch(url)
      setGenres(await genresMovies.json())

    }catch(e){
      console.log(e);
    }
  }, [])

  useMemo(() => {
    getGenres()
  },[getGenres])

  const updateCartLenght = useCallback(() => {
    let count = 0
    shoppingCart.forEach(el => {
      count += el.quant
    })
    setCartLength(count)
  }, [shoppingCart])

  useEffect(() => {
    updateCartLenght()
  },[updateCartLenght])


  const updateFavoritesLenght = useCallback(() => {
    let count = 0
    favorites.forEach(el => {
      count += el.quant
    })
    setFavoritesLength(count)
  }, [favorites])

  useEffect(() => {
    updateFavoritesLenght()
  },[updateFavoritesLenght])

  useEffect(() => {
    if(localStorage.getItem('light-mode') === 'true'){
      setLightModeStatus(localStorage.getItem('light-mode'))
      document.body.classList.add('light-mode')

    }
  }, [])


    return(
    <header className="headerContainer">

      <a href="/"><BiCameraMovie className="icons" size={50}/></a>
      <div className="inputs">

        <div className="header">
          <div className="inputAndSearchButton">
            <input className="searchInput" placeholder='Pesquisa' onChange={(e) => handleGetMovieName(e)}/>
            <BiSearchAlt2 className="icons" size={30} color={'#333'} onClick={searchMovies}/>
          </div>
          {!lightModeStatus && <BsFillSunFill size={25} onClick={darkMode} className="icons"/>}
          {lightModeStatus && <BsFillMoonFill size={25} onClick={darkMode} className="icons"/>}


          <div className="customerIcons">
            <div onClick={showHideFavorites} title="Favoritos">
              <NotificationBadge count={favoritesLength} className="notificationBadge"/>
              <AiFillHeart className="icons" size={30}/>
            </div>
            <div onClick={showHideCart} title="Carrinho">
              <NotificationBadge count={cartLength} className="notificationBadge"/>
              <MdShoppingCart className="icons" size={30} />
            </div>
            <div className="userMenuContainer">
              {token ? <UserMenu/> : <Link className="signInButton" to={'/login'}>Entrar</Link>}
            </div>
          </div>
        </div>

        <div className="secondHeader">
         <div onClick={showHideFavorites} title="Favoritos">
            <NotificationBadge count={favoritesLength} className="notificationBadge"/>
            <AiFillHeart className="icons" size={30}/>
          </div>
          <div onClick={showHideCart} title="Carrinho">
            <NotificationBadge count={cartLength} className="notificationBadge"/>
            <MdShoppingCart className="icons" size={30} />
          </div>
          <div className="userMenuContainer">
            {token ? <UserMenu/> : <Link className="signInButton" to={'/login'}>Entrar</Link>}
          </div>

        </div>
      </div>
    </header>
    )
}

export default Header
