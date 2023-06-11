import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters';
export const Filters = () => {

    const {filters, setFilters} = useFilters()

    const minPriceFilterId = useId();
    const categoryFilterId = useId();
    const handleChange = (e) => {
        
        setFilters(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }))
    }
    const handleChangeCategory = (e) => {
        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }
  return (
    <section className="filters">
        <div>
            <label htmlFor={minPriceFilterId}>Min price</label> 
            <input
            type="range"
            id={minPriceFilterId}
            min='0'
            max='1000'
            onChange={handleChange}
            value={filters.minPrice}/>
        </div>
        <span>{filters.minPrice}</span>
        <div>
            <label htmlFor={categoryFilterId }>Category</label>
            <select id={categoryFilterId } onChange={handleChangeCategory}>
                <option value='all'>All</option>
                <option value='laptops'>Laptops</option>
                <option value='smartphones'>Smartphones</option>
                <option value='home-decoration'>HomeDecoration</option>
                <option value='fragrances'>Fragrances</option>
                <option value='groceries'>Groceries</option>
            </select>
        </div>
    </section>
  )
}
