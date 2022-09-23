import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { MdShoppingCart } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import constants from '../../utils/contants'
import imageBackgroundNotFound from '../../utils/wallpaper_not_found.png'
import Context from '../Context/Context'
import BasicRating from '../Rating'
import SideNavCart from '../SideNavCart'
import SideNavFavorites from '../SideNavFavorites'
import './style.css'

export default function MovieDetails(){
  const {state} = useLocation()
  const [genres, setGenres] = useState([])
  const [shoppingCart, setShoppingCart] = useContext(Context).shoppingCart
  const [favorites, setFavorites] = useContext(Context).favorites
  const baseURLImages = constants.baseURLImagesOriginal


  function handleAddToCart(){
    if(shoppingCart.length && shoppingCart.find(el => el.id === state.id))
      shoppingCart.find(el => el.id === state.id).quant++

    else
      shoppingCart?.unshift({
      id: state.id,
      imageURL: state.poster_path,
      name: state.title,
      quant: 1,
      price: 79.90,
    })

    setShoppingCart([...shoppingCart])
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
  }

  function handleAddToFavorites(){
    if(favorites.indexOf(favorites.find(el => el.id === state.id)) !== -1 ){
      const index = favorites.indexOf(favorites.find(el => el.id === state.id))
      const aux = favorites
      aux.splice(index, 1)
      setFavorites(aux)
    }else{
      favorites?.unshift({
      id: state.id,
      imageURL: state.poster_path,
      name: state.title,
      quant: 1,
      price: 79.90,
    })
    }
    setFavorites([...favorites])
    localStorage.setItem("favorites", JSON.stringify(favorites))
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


  return(
    <section className='movieDetailsContainer'>
      <div className="movieImage">
        {state.poster_path != null
        ?
        <img src={`${baseURLImages}${state.poster_path}`} alt="Movie's poster"/>
        :
        <img src={imageBackgroundNotFound} alt="Movie's poster"/>
        }
      </div>

      <div className="movieData">
        <h1>{state.title}</h1>
        <div className="favCartButtons">
          <div className="addToCart" onClick={handleAddToCart}>
            <span>Adicionar ao carrinho</span>
            <MdShoppingCart size={30} />
          </div>
          <div className="addToFavorites" onClick={handleAddToFavorites}>
            <span>Adicionar aos favoritos</span>
            <AiFillHeart size={30}/>
          </div>
        </div>

        <div className="rating">
          <BasicRating value={state.vote_average}></BasicRating>
        </div>
        <div className="movieDescription">
          <div className="movieOverview">
            <h2>Sinopse</h2>
            <span>{state.overview}</span>
          </div>
          <div className="movieMetaData">
            <div className='movieInformation'>
              <span>Gênero</span>
              <span>{genres.genres?.filter(el => el.id === state.genre_ids[0])[0]?.name}</span>
            </div>
            <div className='movieInformation'>
              <span>Ano de lançamento</span>
              <span>{(state.release_date).toString().slice(0, 4)}</span>
            </div>
          </div>
        </div>
      </div>
      <SideNavFavorites/>
      <SideNavCart/>
    </section>
  )
}