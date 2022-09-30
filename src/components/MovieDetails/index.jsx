import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { BsFillPlayBtnFill } from 'react-icons/bs'
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
  const [linkTrailer, setLinkTrailer] = useState('')
  const {state} = useLocation()
  const [genres] = useContext(Context).genres
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

  async function handleAddToFavorites(){
    try{
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
    }catch(e){
      console.log(e);
    }
  }


  const getVideoURL = useCallback(async () => {
    try{
      const url = `http://localhost:3001/trailer/${state.id}`
      const URLTrailer = await fetch(url)
      const movieVideos = await URLTrailer.json()
      setLinkTrailer(movieVideos)
    }catch(e){
      console.log(e);
    }
  }, [state.id])

useEffect(() => {
  getVideoURL()
}, [getVideoURL])


  return(
    <section className='movieDetailsContainer'>
      <div className="movieImage">
        {state.poster_path != null
        ?
        <img src={`${baseURLImages}${state.poster_path}`} alt="Movie's poster"/>
        :
        <img src={imageBackgroundNotFound} alt="Movie's poster"/>
        }
        <a href={linkTrailer} target="_blank" rel="noreferrer"><BsFillPlayBtnFill/> Trailer</a>
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
