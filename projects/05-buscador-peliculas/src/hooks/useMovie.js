import { useCallback, useRef, useState } from 'react';
import { searchMovies } from '../services/movies';
import { useMemo } from 'react';
// import withResults from  '../mocks/response.json'


export function useMovies({search, sort}){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)

    const getMovies = useCallback(async({search}) => {
            //Se renderiza cada vez que cambia el search
            if(search === previousSearch.current) return
            try {
                setLoading(true)
                setError(null)
                previousSearch.current = search
                const newMovies = await searchMovies({search})
            setMovies(newMovies)
            } catch (error) {
               setError(error.message) 
            }finally{
                setLoading(false)
            }
    },[]) 

    //Este es el calculo que queremos recordar
    const sortedMovies =  useMemo(() => {
        return sort?
        [... movies].sort((a,b) => a.title.localeCompare(b.title))
        :movies
    }, [sort, movies]) 



    return {movies: sortedMovies, getMovies, loading, error}
  }
  