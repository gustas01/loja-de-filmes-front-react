import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/Context'
import './style.css'

export default function Modal(props){
  const [, setShowModal] = useContext(Context).showModal
  const [, setShoppingCart] = useContext(Context).shoppingCart

  async function continueToHome(){
    setShowModal({show: false, name: ''})
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

  return(
    <div className="modalContainer">
      <div className="modalContent">
        <h1>Obrigado {props.name}</h1>
        <h3>Sua compra foi finalizada com sucesso!</h3>
        <p className='finishPurchaseButtonModal'><Link to={'/'} onClick={continueToHome}>Continuar comprando</Link></p>
      </div>
    </div>
  )
}
