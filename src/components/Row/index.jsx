import './style.css'

export default function Row(props) {
  return (
      <div className={`
          grid grid-cols-${props.col ?? 1}
          ${props.noSpace ? '' : 'gap-x-3 gap-y-3 mb-3'}
          ${props.sm ? `sm-grid-cols-${props.sm}` : ''}
      `}>
          {props.children}
      </div>
  )
}
