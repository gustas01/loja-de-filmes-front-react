import {Route, Routes } from 'react-router-dom'
import Content from './components/Content'
import Checkout from './components/Checkout'
import Login from './components/Login'
import CreateNewAccount from './components/CreateNewAccount'
import UpdateUserData from './components/UpdateUserData'

const MyRoutes = (props) => {
  return(
    <Routes>
      <Route index exath path='/' element={<Content/>}/>
      <Route exath path='/checkout' element={<Checkout/>}/>
      <Route exath path='/login' element={<Login/>}/>
      <Route exath path='/register' element={<CreateNewAccount/>}/>
      <Route exath path='/update' element={<UpdateUserData/>}/>
  </Routes>
  )
}

export default MyRoutes
