import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Context from '../Context/Context'
import './style.css'

export default function ModalDeleteUser(props){
  const [, setToken] = useContext(Context).token
  const navigate = useNavigate()

  async function handleConfirmDelete(){
    try{
      const token = JSON.parse(localStorage.getItem('token'))?.token
      const data = await fetch('http://localhost:3001/users', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    const response = await data.json()

    if(data.status > 200 || data.status < 200)
      throw (response.errors[0])

      toast.success("Usuário deletado com sucesso!")
      localStorage.removeItem('token')
      setToken('')
      navigate('/')

  }catch(e){
      toast.error(e.toString());
    }
  }


  function handleCancelDelete(){
    props.setShowModal(false)
  }


  if(!props.show) return <></>
  return(
    <div className="modalDeleteUserContainer">
      <div className="modalDeleteUserContent">
        <h1>Cuidado!</h1>
        <h3>Tem certeza que deseja excluir sua conta?</h3>
        <div className="modalButtons">
          <button onClick={handleConfirmDelete}>Excluir</button>
          <button onClick={handleCancelDelete}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
