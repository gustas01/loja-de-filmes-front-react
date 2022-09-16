import { useContext, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { BsFillTrashFill } from 'react-icons/bs';
import Context from '../Context/Context';
import './style.css'
import constants from '../../utils/contants';
import { MdShoppingCart } from 'react-icons/md';



const SideNavFavorites = () => {

  const [shoppingCart, setShoppingCart] = useContext(Context).shoppingCart
  const [favorites, setfavorites] = useContext(Context).favorites

  const baseURLImages = constants.baseURLImagesW45

  function handleAddToCart(movie){
    if(shoppingCart.length && shoppingCart.find(el => el.id === movie.id))
      shoppingCart.find(el => el.id === movie.id).quant++

    else
      shoppingCart?.unshift({
      id: movie.id,
      imageURL: movie.imageURL,
      name: movie.name,
      quant: 1,
      price: 79.90,
    })


    setShoppingCart([...shoppingCart])
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
  }

  function clearFavorites(){
    setfavorites([])
    if(localStorage.getItem("favorites"))
      localStorage.removeItem("favorites")
  }

  function removeItem(index){
    const filteredItens = favorites
    filteredItens.splice(index, 1)
    setfavorites([...filteredItens])
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }


  useEffect(() => {
    if(localStorage.getItem("favorites"))
    setfavorites(JSON.parse(localStorage.getItem("favorites")))
  },[setfavorites])

  return (
    <aside className='sideNavFavoritesContainer' id='sideNavFavoritesContainer'>
      <div className='sideNavFavoritesTitles'>
        <h3>Meus favoritos</h3>
        <p className='clearFavorites' onClick={() => clearFavorites()}>Esvaziar</p>
      </div>
      <ul className='favoritesItemsList'>

        {favorites?.map((el, index) => {
          return (
            <li className='favoritesItem' key={index} >
              {el.imageURL != null
              ?
              <img src={`${baseURLImages}${el.imageURL}`} alt="" />
              :
              <img src={`https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png`} alt="" />
            }
              <p className='favoritesMovieName' title={el.name}>{el.name}</p>
              <MdShoppingCart className='addToCartIcon' onClick={() => handleAddToCart(el)} size={25} />
              <p title='Preço'>{<CurrencyFormat value={el.price} thousandSeparator='.' decimalSeparator=',' displayType='text' prefix='R$' decimalScale={2} fixedDecimalScale={true}/>}</p>

              <BsFillTrashFill className='trashIcon' title='Remover do carrinho' onClick={() => removeItem(index)}/>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default SideNavFavorites
