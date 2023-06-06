import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovie";
import debounce from 'just-debounce-it'

// const API_KEY = '2c5a8a05'
const useSearch = () => {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);


  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if (search === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (search.match(/^\d$/)) {
      setError("No se peude buscar una pelicula con un numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe terner al menos 3 caracteres");
      return;
    }
    setError(null);
  }, [search]);

  return {search, setSearch, error}
}
function App() {

  const [sort, setSort] =useState(false)
  const {search, setSearch, error} = useSearch()
  const { movies, getMovies, loading } = useMovies({search, sort});
  
  const debouncedGetMovies = useCallback(
    debounce(search => {
    getMovies({search})
    }, 300) 

  ,[getMovies]) 

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({search})
  };

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(e.target.value);
    debouncedGetMovies(newSearch)
  };

  const handleSort = () => {
    setSort(!sort)
  }
  

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange}
            name="query"
            type="text"
            placeholder="Avengers, Star Wars, The Matrix..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        {
          loading && <p>Cargando</p>
        }
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
