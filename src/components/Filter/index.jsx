import './style.css'

export default function Filter(){
  return(
    <div className="filter">
      <span>Filtrar</span>
      <select className="filterSelect">
        <option value=""></option>
        <option value="">Opção 1</option>
        <option value="">Opção 2</option>
        <option value="">Opção 3</option>
      </select>
    </div>

  )
}
