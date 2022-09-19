import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import { AiFillHeart } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import NotificationBadge from 'react-notification-badge';

import './style.css'
import { useCallback, useContext, useEffect, useState } from "react";
import Context from "../Context/Context";

const Header = () => {
  const [, setmovieNameSearch] = useContext(Context).movieNameSearch
  const [shoppingCart, ] = useContext(Context).shoppingCart
  const [favorites, ] = useContext(Context).favorites
  const [darkModeStatus, setDarkModeStatus] = useContext(Context).darkMode
  const [cartLength, setCartLength] = useState(0)
  const [favoritesLength, setFavoritesLength] = useState(0)

  let inputText = ''

  function handleGetMovieName(e){
    inputText = e.target.value
  }

  function searchMovies(){
    setmovieNameSearch(inputText);
  }

  function darkMode(){
    document.body.classList.toggle('dark-mode')
    setDarkModeStatus(!darkModeStatus)
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


  const updateFavopritesLenght = useCallback(() => {
    let count = 0
    favorites.forEach(el => {
      count += el.quant
    })
    setFavoritesLength(count)
  }, [favorites])

  useEffect(() => {
    updateFavopritesLenght()
  },[updateFavopritesLenght])

    return(
    <header className="header">
      <a href="/"><BiCameraMovie className="icons" size={30}/></a>
      <div className="FlexClose">
        <input className="searchInput" placeholder='Pesquisa' onChange={(e) => handleGetMovieName(e)}/>
        <BiSearchAlt2 className="icons" size={30} color={'#333'} onClick={searchMovies}/>
      </div>
      {darkModeStatus && <BsFillSunFill size={25} onClick={darkMode} className="icons"/>}
      {!darkModeStatus && <BsFillMoonFill size={25} onClick={darkMode} className="icons"/>}

      <div className="FlexDistant">
        <div onClick={showHideFavorites} title="Favoritos">
          <NotificationBadge count={favoritesLength} className="notificationBadge"/>
          <AiFillHeart className="icons" size={30}/>
        </div>
        <div onClick={showHideCart} title="Carrinho">
          <NotificationBadge count={cartLength} className="notificationBadge"/>
          <MdShoppingCart className="icons" size={30} />
        </div>
      </div>
    </header>
    )
}

export default Header
