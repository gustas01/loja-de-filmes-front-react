/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Card from "../Card";
import SideNavCart from "../SideNavCart";
import SideNavFavorites from "../SideNavFavorites";
import Pagination from "../Pagination";
import './style.css'
import Context from "../Context/Context";

const Content = (props) => {
  const [movieNameSearch, ] = useContext(Context).movieNameSearch
  const [movies, setMovies] = useState({})
  const [genres, setGenres] = useState({})
  const [page, setPage] = useState(1)
  const [pageFromSearchedMovie, setPageFromSearchedMovie] = useState(1)


  const getMovies = useCallback(async () => {
    try{
      const url = `http://localhost:3001/${page}/`
      const trendingMovies = await fetch(url)
      console.log(trendingMovies);
      setMovies(await trendingMovies.json())
    }catch(e){
      console.log(e);
    }
  }, [page])


  const getGenres = useCallback(async () => {
    try{
      const url = `http://localhost:3001/genres`
      const genresMovies = await fetch(url)
      setGenres(await genresMovies.json())
    }catch(e){
      console.log(e);
    }
  }, [])

  async function searchMovies(){
    try{
      if(movieNameSearch){
        const url = `http://localhost:3001/${movieNameSearch}/${pageFromSearchedMovie}`
        const searchedMovies = await fetch(url)
        setMovies(await searchedMovies.json())
      }
    }catch(e){
      console.log(e);
    }
  }


  useEffect(() => {
    getMovies()
  }, [getMovies])

  useMemo(() => {
    getGenres()
  },[getGenres])


  useEffect(() => {
    setPageFromSearchedMovie(1)
    searchMovies()
  },[movieNameSearch])

  useEffect(() => {
    searchMovies()
  },[pageFromSearchedMovie])

  return(
    <div className="contentContainer">
      <div className="contentMain">
        <main className="main">
          {movies.results?.map((movie, index) => {
            return (
              <Card key={movie.id} movie={movie} index={index} genres={genres.genres}/>
              )})
            }
        </main>
        <SideNavCart/>
        <SideNavFavorites/>
      </div>
        {movieNameSearch ?
        <Pagination  page={pageFromSearchedMovie} setPage={setPageFromSearchedMovie} totalPages={movies.total_pages}/>
         :
        <Pagination page={page} setPage={setPage} totalPages={movies.total_pages}/>
         }

    </div>
  )
}

export default Content
