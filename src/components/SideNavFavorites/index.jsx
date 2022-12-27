import { useContext } from 'react';
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

  async function handleAddToCart(movie){
    try{
      if(shoppingCart.length && shoppingCart.find(el => el.id === movie.id))
      shoppingCart.find(el => el.id === movie.id).quant++

      else
        shoppingCart?.unshift({
        id: movie.id,
        poster_path: movie.imageURL,
        title: movie.name,
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
    }catch(e){
      console.log(e);
    }
  }

  async function clearFavorites(){
   try{
    const token = JSON.parse(localStorage.getItem('token'))?.token
    const data = await fetch('http://localhost:3001/favorites', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([])
    })
    const response = await data.json()

    if(data.status > 200 || data.status < 200)
      throw (response.errors[0])

    setfavorites([])
   }catch(e){
      console.log(e);
   }
  }

  async function removeItem(index){
    try{
      const filteredItens = favorites
      filteredItens.splice(index, 1)
      setfavorites([...filteredItens])

      const token = JSON.parse(localStorage.getItem('token'))?.token
      const data = await fetch('http://localhost:3001/favorites', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filteredItens)
      })
      const response = await data.json()

      if(data.status > 200 || data.status < 200)
        throw (response.errors[0])
      }catch(e){
        console.log(e);
      }
  }


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
