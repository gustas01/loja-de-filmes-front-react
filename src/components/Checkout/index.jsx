import Row from '../Row'
import './style.css'
import { useCallback, useContext, useEffect, useState } from 'react'
import Context from '../Context/Context'
import { BsFillTrashFill } from 'react-icons/bs'
import CurrencyFormat from 'react-currency-format'
import InputMask from 'react-input-mask';
import { cpf } from 'cpf-cnpj-validator';
import validator from 'validator'
import constants from '../../utils/contants'
import SideNavFavorites from '../SideNavFavorites'

export default function Checkout() {

  const [shoppingCart, setShoppingCart] = useContext(Context).shoppingCart
  const [, setShowModal] = useContext(Context).showModal
  const [totalPurchaseCheckout, setTotalPurchaseCheckout] = useState(0)

  const [validCPF, setValidCPF] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [customerName, setCustomerName] = useState('')


  const baseURLImages = constants.baseURLImagesW45


  async function removeItem(index){
    try{
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
    }catch(e){
      console.log(e);
    }
  }

  function saveName(e){
    setCustomerName(e.target.value)
  }

  const calculateTotalPricePurshaceCheckout = useCallback(() => {
    let total = 0
    shoppingCart.forEach(el => {
      total += el.quant * el.price
    })
    setTotalPurchaseCheckout(total)
  }, [shoppingCart])

  function finishPurchase(e){
    setShowModal({show: true, name: customerName})
  }

  const CPFValidator = (e) => {
    const cpfClean = e.target.value.replace(/\./g, '').replace('-', '')
    setValidCPF(cpf.isValid(cpfClean))
  }

  const emailValidator = (e) => {
    setValidEmail(validator.isEmail(e.target.value))
  }



  useEffect(() => {
    calculateTotalPricePurshaceCheckout()
  },[calculateTotalPricePurshaceCheckout])

  return(
    <section className='checkoutContainer'>
      <div className='formData'>
        <h1>Finalizar compra</h1>
        <form action="#" id='formCustomerData'>
          <Row>
            <input required onChange={(e) => saveName(e)} placeholder='Nome Completo' type="text"/>
          </Row>
          <Row col={2} sm={1}>
            <InputMask required mask={"999.999.999-99"} placeholder='CPF' onChange={(e) => CPFValidator(e)}/>
            <InputMask required mask={"(99)99999-9999"} placeholder='Celular'/>
          </Row>
          <Row>
            <input required placeholder='E-mail' type='email' onChange={(e) => emailValidator(e)}/>
          </Row>
          <Row col={2} sm={1}>
            <InputMask required mask={"99999-999"} placeholder='CEP'/>
            <input required placeholder='Endere??o' type="text" />
          </Row>
          <Row col={2} sm={1}>
            <input required placeholder='Cidade' type="text" />
            <input required placeholder='Estado' type="text" />
          </Row>
        </form>
      </div>


      <div className='checkoutList'>
          <ul>
            <li><h1>Itens do carrinho</h1></li>
            {shoppingCart?.map((el, index) => {
            return (
              <li col={5} className='cartItemCheckout' key={el.id} >
                {el.poster_path != null?
                <img src={`${baseURLImages}${el.poster_path}`} alt="" />
                :
                <img src={`https://www.themoviedb.org/assets/2/apple-touch-icon-cfba7699efe7a742de25c28e08c38525f19381d31087c69e89d6bcb8e3c0ddfa.png`} alt="" />
                }
                <p className='cartMovieNameCheckout' title={el.title}>{el.title}</p>
                <p title='Quantidade'>{el.quant}</p>
                <p title='Pre??o'>{<CurrencyFormat value={el.price} thousandSeparator='.' decimalSeparator=',' displayType='text' prefix='R$' decimalScale={2} fixedDecimalScale={true}/>}</p>

                <BsFillTrashFill className='trashIcon' title='Remover do carrinho' onClick={() => removeItem(index)}/>
              </li>
            )
            })}
          </ul>
          <hr />
          <br />
          <div className='totalValueCartCheckout'>
            <p>Total:</p>
            <p>{<CurrencyFormat value={totalPurchaseCheckout} thousandSeparator='.' decimalSeparator=',' displayType='text' prefix='R$' decimalScale={2} fixedDecimalScale={true}/>}</p>
          </div>
          <button className='finishPurchaseButtonCheckout' disabled={!validCPF || !customerName || !validEmail} onClick={(e) => finishPurchase(e)}>Finalizar compra</button>

      </div>
      <span id="sideNavCartContainer"/>
      <SideNavFavorites/>

    </section>
  )
}
