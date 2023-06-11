
import { useEffect, useRef, useState } from 'react';
import { Filters } from './Filters'


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

const Header = () => {

  const {search, setSearch} = useSearch()

  const handleSubmit = (e) => {
    e.preventDefault();
    // getMovies({search})
  };

  const handleChange = (e) => {
    const newSearch = e.target.value
    setSearch(e.target.value);
    // debouncedGetMovies(newSearch)
  };
  return (
    <header>
        <h1>React Shop</h1><form className="form" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange}
            name="query"
            type="text"
            placeholder="Laptops, smartphones, fragances.."
          />
          <button type="submit">Buscar</button>
        </form>
        <Filters/>
    </header>
  )
}

export default Header