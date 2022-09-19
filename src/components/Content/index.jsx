/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Card from "../Card";
import SideNavCart from "../SideNavCart";
import SideNavFavorites from "../SideNavFavorites";
import Pagination from "../Pagination";
import './style.css'
import Context from "../Context/Context";
import Loading from "../Loading";

const Content = (props) => {
  const [movieNameSearch, ] = useContext(Context).movieNameSearch
  const [movies, setMovies] = useState({})
  const [genres, setGenres] = useState({})
  const [page, setPage] = useState(1)
  const [pageFromSearchedMovie, setPageFromSearchedMovie] = useState(1)
  const [isLoading, setIsLoading] = useState(false)


  const getMovies = useCallback(async () => {
    try{
      setIsLoading(true)
      const url = `http://localhost:3001/${page}/`
      const trendingMovies = await fetch(url)
      setMovies(await trendingMovies.json())
      setIsLoading(false)
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
      <Loading isLoading={isLoading}></Loading>
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
        <Pagination isLoading={isLoading} page={pageFromSearchedMovie} setPage={setPageFromSearchedMovie} totalPages={movies.total_pages}/>
         :
        <Pagination isLoading={isLoading} page={page} setPage={setPage} totalPages={movies.total_pages}/>
         }

    </div>
  )
}

export default Content
