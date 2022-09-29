import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './style.css'

export default function CreateNewAccount(props){
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const navigate = useNavigate()

  async function handleCreateUser(){
    try{
      if(!userName && !userEmail && !userPassword) return

      const data = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          name: userName,
          email: userEmail,
          password: userPassword
        }
        )
    })

    const response = await data.json()

    if(data.status > 200 || data.status < 200)
      throw (response.errors[0])

      toast.success("Usuário criado com sucesso!")
      navigate('/login')
    }catch(e){
      toast.error(e.toString());
    }

  }
  return(
    <section className='newAccountPage'>
      <div className="newAccountContainer">
        <h1 className='newAccountTitle'>Criar nova conta</h1>
        <form action="" className="newAccountForm" onSubmit={e => e.preventDefault()}>
          <label htmlFor="name">Nome</label>
          <input type="text" id='name' name='name' onChange={(e) => setUserName(e.target.value)} required/>
          <label htmlFor="email">E-mail</label>
          <input type="email" id='email' name='email' onChange={(e) => setUserEmail(e.target.value)} required/>
          <label htmlFor="password">Senha</label>
          <input type="password" id='password' name='password' onChange={(e) => setUserPassword(e.target.value)} required/>
          <button onClick={handleCreateUser}>Criar</button>
        </form>
      </div>
    </section>
  )
}
