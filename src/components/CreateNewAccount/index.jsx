import './style.css'

export default function CreateNewAccount(props){


  return(
    <section className='newAccountPage'>
      <div className="newAccountContainer">
        <h1 className='newAccountTitle'>Criar nova conta</h1>
        <form action="" className="newAccountForm">
          <label htmlFor="name">Nome</label>
          <input type="text" id='name' name='name' required/>
          <label htmlFor="email">E-mail</label>
          <input type="email" id='email' name='email' required/>
          <label htmlFor="password">Senha</label>
          <input type="password" id='email' name='email' required/>
          <button>Criar</button>
        </form>
      </div>
    </section>
  )
}
