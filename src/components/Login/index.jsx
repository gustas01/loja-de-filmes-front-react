import { Link } from 'react-router-dom'
import './style.css'

export default function Login(props){


  return(
    <section className='loginPage'>
      <div className="loginContainer">
        <h1 className='loginTitle'>Login</h1>
        <form action="" className="loginForm">
          <label htmlFor="email">E-mail</label>
          <input type="email" id='email' name='email'/>
          <label htmlFor="password">Senha</label>
          <input type="password" id='email' name='email'/>
          <div className='keepLoggedIn'>
            <input type="checkbox" name="keepLoggedIn" id="keepLoggedIn" />
            <label htmlFor="keepLoggedIn">Manter-me logado</label>
          </div>
          <button>Entrar</button>
        </form>
        <div className='register'>
          <label htmlFor="register">Ainda não tem conta? </label>
          <Link to='/register' id='register'>Cadastre-se</Link>
        </div>
      </div>
    </section>
  )
}
