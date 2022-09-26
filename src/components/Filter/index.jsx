import { useContext } from 'react'
import Context from '../Context/Context'
import './style.css'

export default function Filter(){
  const [genres] = useContext(Context).genres

  return(
    <div className="filter">
      <span>Filtrar</span>
      <select className="filterSelect">
        <option value=""></option>
        {genres.genres?.map(el =>
          <option key={el.id} value={el.name}>{el.name}</option>
          )}
      </select>
    </div>

  )
}
