/* eslint-disable react-hooks/exhaustive-deps */
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
import { toast } from "react-toastify";


const Header = () => {
  const [, setmovieNameSearch] = useContext(Context).movieNameSearch
  const [shoppingCart, setShoppingCart] = useContext(Context).shoppingCart
  const [favorites, setfavorites] = useContext(Context).favorites
  const [, setGenres] = useContext(Context).genres
  const [token, setToken] = useContext(Context).token
  const [lightModeStatus, setLightModeStatus] = useState(false)
  const [cartLength, setCartLength] = useState(0)
  const [favoritesLength, setFavoritesLength] = useState(0)
  const [inputText, setInputText] = useState('')

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
    if(!token){
      toast.warn("Você deve entrar antes de acessar o carrinho")
      return
    }
    if(document.getElementById('sideNavFavoritesContainer').classList.contains('showHideFavorites')){
      document.getElementById('sideNavFavoritesContainer').classList.remove('showHideFavorites')
    }
    document.getElementById('sideNavCartContainer').classList.toggle('showHideCart')
  }

  function showHideFavorites(){
    if(!token){
      toast.warn("Você deve entrar antes de acessar os favoritos")
      return
    }
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
    shoppingCart?.forEach(el => {
      count += el.quant
    })
    setCartLength(count)
  }, [shoppingCart])

  useEffect(() => {
    updateCartLenght()
  },[updateCartLenght])


  useEffect(() => {
    if(JSON.parse(localStorage.getItem('token'))?.token){
      async function getCart(){
        const token = JSON.parse(localStorage.getItem('token'))?.token
        const data = await fetch('http://localhost:3001/shoppingCart', {
          method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      const response = await data.json()
      setShoppingCart(response);
      if(data.status > 200 || data.status < 200)
        throw (response.errors[0])
    }

    getCart()
  }

  },[setShoppingCart, token])


  useEffect(() => {
    if(JSON.parse(localStorage.getItem('token'))?.token){
      async function getfavorites(){
        const token = JSON.parse(localStorage.getItem('token'))?.token
        const data = await fetch('http://localhost:3001/favorites', {
          method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      const response = await data.json()
      setfavorites(response);
      if(data.status > 200 || data.status < 200)
        throw (response.errors[0])
    }

    getfavorites()
  }

  },[setfavorites, token])




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


  useEffect(() => {
    if(JSON.parse(localStorage.getItem('token')))
      setToken(JSON.parse(localStorage.getItem('token')).token);
  }, [setToken, token])



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
            <div className="userMenuContainer">
              {token ? <UserMenu/> : <Link className="signInButton" to={'/login'}>Entrar</Link>}
            </div>
            <div onClick={showHideFavorites} title="Favoritos">
              <NotificationBadge count={favoritesLength} className="notificationBadge"/>
              <AiFillHeart className="icons" size={30}/>
            </div>
            <div onClick={showHideCart} title="Carrinho">
              <NotificationBadge count={cartLength} className="notificationBadge"/>
              <MdShoppingCart className="icons" size={30} />
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
