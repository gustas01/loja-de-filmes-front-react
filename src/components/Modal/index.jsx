import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../Context/Context'
import './style.css'

export default function Modal(props){
  const [, setShowModal] = useContext(Context).showModal
  const [, setShoppingCart] = useContext(Context).shoppingCart

  function continueToHome(){
    setShowModal({show: false, name: ''})
    setShoppingCart([])
    if(localStorage.getItem("shoppingCart"))
      localStorage.removeItem("shoppingCart")
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
