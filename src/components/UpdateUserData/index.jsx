import { useContext, useState } from 'react'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/Context';
import ModalDeleteUser from '../ModalDeleteUser';
import './style.css'

export default function UpdateUserData(props){
  const [userName, setUserName] = useState(jwt_decode(JSON.parse(localStorage.getItem('token'))?.token).name)
  const [userEmail, setUserEmail] = useState(jwt_decode(JSON.parse(localStorage.getItem('token'))?.token).email)
  const [userPassword, setUserPassword] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [, setToken] = useContext(Context).token


  const navigate = useNavigate()


  async function handleUpdateUserData(){
    try{
      const token = JSON.parse(localStorage.getItem('token'))?.token
      const data = await fetch('http://localhost:3001/users', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
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

      toast.success("Dados atualizados com sucesso!")
      localStorage.removeItem('token')
      setToken('')
      navigate('/login')
      toast.success("Faça login novamente")

  }catch(e){
      toast.error(e.toString());
    }
 }


  function handleDeleteUser(){
    setShowModal(true)
  }

  return(
    <section className='newAccountPage'>
      <ModalDeleteUser setShowModal={setShowModal} show={showModal}/>
      <div className="newAccountContainer">
        <h1 className='newAccountTitle'>Atualizar dados</h1>
        <form action="" className="newAccountForm" onSubmit={e => e.preventDefault()}>
          <label htmlFor="name">Nome</label>
          <input type="text" id='name' name='name' value={userName} onChange={(e) => setUserName(e.target.value)} required/>
          <label htmlFor="email">E-mail</label>
          <input type="email" id='email' name='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required/>
          <label htmlFor="password">Senha</label>
          <input type="password" id='password' name='email' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required/>
          <button onClick={handleUpdateUserData}>Atualizar</button>
          <button onClick={handleDeleteUser} type='button' className='deleteAccountButton'>Excluir conta</button>
        </form>
      </div>
      <span id="sideNavFavoritesContainer"/>
      <span id="sideNavCartContainer"/>
    </section>
  )
}
