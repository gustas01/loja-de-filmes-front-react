/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import './style.css'
import constants from '../../utils/contants'
import imageBackgroundNotFound from '../../utils/wallpaper_not_found.png'
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const [shoppingCart, setShoppingCart] = useContext(Context).shoppingCart
  const [favorites, setFavorites] = useContext(Context).favorites
  const [favorite, setFavorite] = useState(false)


  const navigate = useNavigate()
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const date = new Date(props.movie.release_date)
  const baseURLImages = constants.baseURLImagesOriginal


  async function handleAddToCart(){
    if(shoppingCart.length && shoppingCart.find(el => el.id === props.movie.id))
      shoppingCart.find(el => el.id === props.movie.id).quant++

    else
      shoppingCart?.unshift({
      id: props.movie.id,
      poster_path: props.movie.poster_path,
      title: props.movie.title,
      quant: 1,
      price: 79.90,
    })

    setShoppingCart([...shoppingCart])

    const token = JSON.parse(localStorage.getItem('token'))?.token
    const data = await fetch('http://localhost:3001/shoppingCart', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shoppingCart)
    })
    const response = await data.json()

    if(data.status > 200 || data.status < 200)
      throw (response.errors[0])
  }


  async function handleAddToFavorites(){
    if(favorite){
      const index = favorites.indexOf(favorites.find(el => el.id === props.movie.id))
      const aux = favorites
      aux.splice(index, 1)
      setFavorites(aux)
    }else{
        favorites?.unshift({
        id: props.movie.id,
        poster_path: props.movie.poster_path,
        title: props.movie.title,
        quant: 1,
        price: 79.90,
      })
    }

    setFavorite(!favorite)
    setFavorites([...favorites])

    const token = JSON.parse(localStorage.getItem('token'))?.token
    const data = await fetch('http://localhost:3001/favorites', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(favorites)
    })
    const response = await data.json()

    if(data.status > 200 || data.status < 200)
      throw (response.errors[0])
  }

  function handleShowMovieDetails(){
    navigate ('/movieDetails', {
      state: props.movie
    })
  }

useEffect(() => {
  if(favorites.find(el => el.id === props.movie.id))
    setFavorite(true)
  else
    setFavorite(false)
}, [favorites])

  return (
    <div className="cardContainer">
      <div className="cardImage">
        {!favorite && <AiFillHeart className="icon" size={25} onClick={handleAddToFavorites}/>}
        { favorite && <AiFillHeart className="icon favorite" size={25} onClick={handleAddToFavorites}/>}

        {props.movie.poster_path != null
        ?
        <img src={`${baseURLImages}${props.movie.poster_path}`} alt="Movie's poster" onClick={handleShowMovieDetails}/>
        :
        <img src={imageBackgroundNotFound} alt="Movie's poster" onClick={handleShowMovieDetails}/>
        }

      </div>
      <div className="movieDetails" onClick={handleShowMovieDetails}>
        <p>{`${date.getDate()+1} de ${months[(date.getMonth())]}, ${date.getFullYear()}`}</p>
        <p className="movieTitle" title={props.movie.title}>{props.movie.title}</p>
        <div className="starsGenre">
          <p><AiFillStar/>{props.movie.vote_average}</p>
          <p>{props.genres?.filter(el => el.id === props.movie.genre_ids[0])[0]?.name}</p>
        </div>
        <p>R$ 79,90</p>
      </div>
      <button className="addButton" onClick={handleAddToCart}>+ Adicionar</button>
    </div>
  )
}

export default Card
