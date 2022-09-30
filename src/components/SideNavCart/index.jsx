import { useCallback, useContext, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import Context from '../Context/Context';
import './style.css'
import constants from '../../utils/contants';



const SideNavCart = () => {

  const [shoppingCart, setShoppingCart] = useContext(Context).shoppingCart
  const [totalPurchase, setTotalPurchase] = useState(0)

  const baseURLImages = constants.baseURLImagesW45


  async function clearCart(){
    const token = JSON.parse(localStorage.getItem('token'))?.token
    const data = await fetch('http://localhost:3001/shoppingCart', {
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

    setShoppingCart([])
  }

  async function removeItem(index){
    const filteredItens = shoppingCart
    filteredItens.splice(index, 1)
    setShoppingCart([...filteredItens])

    const token = JSON.parse(localStorage.getItem('token'))?.token
    const data = await fetch('http://localhost:3001/shoppingCart', {
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
  }


  const calculateTotalPricePurshace = useCallback(() => {
    let total = 0
    shoppingCart?.forEach(el => {
      total += el.quant * el.price
    })
    setTotalPurchase(total)
  }, [shoppingCart])


  useEffect(() => {
    calculateTotalPricePurshace()
  },[calculateTotalPricePurshace])


  return (
    <aside className='sideNavCartContainer' id='sideNavCartContainer'>
      <div className='sideNavCartTitles'>
        <h3>Meu carrinho</h3>
        <p className='clearCart' onClick={() => clearCart()}>Esvaziar</p>
      </div>
      <ul className='cartItemsList'>

        {shoppingCart?.map((el, index) => {
          return (
            <li className='cartItem' key={index} >
              {el.imageURL != null?
              <img src={`${baseURLImages}${el.imageURL}`} alt="" />
            :
              <img src={`https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png`} alt="" />
            }
              <p className='cartMovieName' title={el.name}>{el.name}</p>
              <p title='Quantidade'>{el.quant}</p>
              <p title='Preço'>{<CurrencyFormat value={el.price} thousandSeparator='.' decimalSeparator=',' displayType='text' prefix='R$' decimalScale={2} fixedDecimalScale={true}/>}</p>

              <BsFillTrashFill className='trashIcon' title='Remover do carrinho' onClick={() => removeItem(index)}/>
            </li>
          )
        })}
      </ul>
      <div className='totalValueCart'>
        <p>Total:</p>
        <p>{<CurrencyFormat value={totalPurchase} thousandSeparator='.' decimalSeparator=',' displayType='text' prefix='R$' decimalScale={2} fixedDecimalScale={true}/>}</p>
      </div>
     <p className='finishPurchaseButton'><Link to="/checkout" disabled={!!totalPurchase}>Finalizar compra</Link></p>
    </aside>
  )
}

export default SideNavCart
