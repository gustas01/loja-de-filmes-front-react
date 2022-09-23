import { Link } from 'react-router-dom'
import './style.css'

export default function UpdateUserData(props){


  return(
    <section className='newAccountPage'>
      <div className="newAccountContainer">
        <h1 className='newAccountTitle'>Atualizar dados</h1>
        <form action="" className="newAccountForm">
          <label htmlFor="name">Nome</label>
          <input type="text" id='name' name='name' required/>
          <label htmlFor="email">E-mail</label>
          <input type="email" id='email' name='email' required/>
          <label htmlFor="password">Senha</label>
          <input type="password" id='password' name='email' required/>
          <button>Atualizar</button>
        </form>
      </div>
    </section>
  )
}
