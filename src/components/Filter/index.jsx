import { useContext } from 'react'
import Context from '../Context/Context'
import './style.css'

export default function Filter(props){
  const [genres] = useContext(Context).genres


  function captureGenre(e){
    props.setGenreFilter(genres.genres.filter(el => el.name === e)[0].id)
  }

  return(
    <div className="filter">
      <span>Filtrar</span>
      <select className="filterSelect" onChangeCapture={(e) => captureGenre(e.target.value)}>
        <option value=""></option>
        {genres.genres?.map(el =>
          <option key={el.id} value={el.name}>{el.name}</option>
          )}
      </select>
    </div>

  )
}
