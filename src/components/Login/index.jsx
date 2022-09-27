import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'

export default function Login(props){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function handleSaveEmail(e){
    setEmail(e.value);
  }

  function handleSavePassword(e){
    setPassword(e.value);

  }

  async function handleSubmitForm(){
    const data = await fetch('http://localhost:3001/tokens/', {
      method: 'POST',
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify({email: "asdaaa", password: "123"})
    })

    const response = await data.json()
    console.log(response);

    // navigate('/')
  }

  return(
    <section className='loginPage'>
      <div className="loginContainer">
        <h1 className='loginTitle'>Login</h1>
        <form className="loginForm" onSubmit={e => e.preventDefault()}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id='email' name='email' onChange={(e) => handleSaveEmail(e.target)} required/>
          <label htmlFor="password">Senha</label>
          <input type="password" id='password' name='password' onChange={(e) => handleSavePassword(e)} required/>
          <div className='keepLoggedIn'>
            <input type="checkbox" name="keepLoggedIn" id="keepLoggedIn" />
            <label htmlFor="keepLoggedIn">Manter-me logado</label>
          </div>
          <button type='submit' onClick={handleSubmitForm}>Entrar</button>
        </form>
        <div className='register'>
          <label htmlFor="register">Ainda não tem conta? </label>
          <Link to='/register' id='register'>Cadastre-se</Link>
        </div>
      </div>
    </section>
  )
}
