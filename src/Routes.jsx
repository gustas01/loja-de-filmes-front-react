import {Route, Routes } from 'react-router-dom'
import Content from './components/Content'
import Checkout from './components/Checkout'

const MyRoutes = (props) => {
  return(
    <Routes>
      <Route index exath path='/' element={<Content/>}/>
      <Route exath path='/checkout' element={<Checkout/>}/>
  </Routes>
    )
}

export default MyRoutes
