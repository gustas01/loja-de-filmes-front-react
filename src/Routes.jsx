import {Route, Routes } from 'react-router-dom'
import Content from './components/Content'
import Checkout from './components/Checkout'
import Login from './components/Login'

const MyRoutes = (props) => {
  return(
    <Routes>
      <Route index exath path='/' element={<Content/>}/>
      <Route exath path='/checkout' element={<Checkout/>}/>
      <Route exath path='/login' element={<Login/>}/>
      <Route exath path='/register' element={<Content/>}/>
  </Routes>
  )
}

export default MyRoutes
