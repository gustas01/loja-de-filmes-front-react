import './style.css'

const Pagination = (props) => {

  function nextPage(){
    props.setPage(props.page + 1)
    window.scrollTo(0, 0)
  }

  function previousPage(){
    props.setPage(props.page - 1)
    window.scrollTo(0, 0)
  }

  function setPagePlus2(){
    props.setPage(props.page + 2)
    window.scrollTo(0, 0)
  }



  return(
    <>
      {props.total_pages === 1 ? '':
        <div className='paginationContainer'>
          <button disabled={props.page > 1 ? false: true} onClick={previousPage}>Anterior</button>
          {props.totalPages === 2 ? '':
            <>
              <button disabled>{props.page}</button>
              {props.page + 1 > props.totalPages ? '' :
                <button onClick={nextPage}>{props.page + 1}</button>
              }
              {props.page + 2 > props.totalPages ? '':
              <button onClick={setPagePlus2}>{props.page + 2}</button>
              }
            </>
          }
          <button disabled={props.page === props.totalPages ? true: false} onClick={nextPage}>Próxima</button>
        </div>
      }
    </>
  )
}

export default Pagination
