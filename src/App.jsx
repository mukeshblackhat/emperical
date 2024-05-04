import { useState,useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import DataTable from './components/DataTable';
import axios from 'axios';

const useQueryFunction = () => {
  return new URLSearchParams(useLocation().search);
};

const  App=()=> {
  const [products,setProducts]=useState([]);
  const query = useQueryFunction();
  let [searchParams, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState(products||[]);
  const [companyFilter, setCompanyFilter] = useState( query.get('company') || '');
  const [colorFilter, setColorFilter] = useState(query.get('color') || '');
  const [priceFilter, setPriceFilter] = useState(query.get('price') || '');
  const [loading,setLoading]=useState(true);
  const [error , setError]=useState(false);

  useEffect(() => { 
    axios.get('https://api.restful-api.dev/objects').then((res)=>{
      setProducts(res.data);
      setLoading(false);
    }).catch(()=>setError(true))},[]);

  useEffect(() => {
    let filteredProducts = products;
    if (companyFilter !== 'select' && companyFilter) {
      filteredProducts = filteredProducts?.filter(product => 
         product.name.toLowerCase().includes(companyFilter));
    }
    if (colorFilter !== 'select' && colorFilter) {
      filteredProducts = filteredProducts?.filter(product => product.data && 
        product?.data?.color?.toLowerCase() === colorFilter);
    }
    if (priceFilter !== 'select' && priceFilter) {
      const priceRange = priceFilter.split('+');
      filteredProducts = filteredProducts?.filter(product => product.data && product.data.price >= parseFloat(priceRange[0]));
    }

    setFilterData(filteredProducts);
  }, [companyFilter, colorFilter, priceFilter,products]);  // Dependencies for useEffect

  const handleCompanyChange = (filterName,value) => {
    setCompanyFilter(value);
    const newQueryParams = new URLSearchParams(query);
    newQueryParams.set(filterName, value);
    setSearchParams(newQueryParams.toString())  
  };

  const handleColorChange = (filterName,value) => {
    setColorFilter(value);
    const newQueryParams = new URLSearchParams(query);
    newQueryParams.set(filterName, value);
    setSearchParams(newQueryParams.toString())
  };

  const handlePriceChange = (filterName,value) => {
    setPriceFilter(value);
    const newQueryParams = new URLSearchParams(query);
    newQueryParams.set(filterName, value);
    setSearchParams(newQueryParams.toString())
  };

 return ( <div className="">
  <div className="flex bg-gray-200 p-5 ">Mobile Bar</div>
 <div className="searchBar mt-4 ml-4 ">
  <input type="text" className="border-2 border-gray-300 p-2 rounded-xl w-1/4" placeholder="Search"/>
 </div>
 {error && <div className="text-xl m-4 text-red-500">OOps something gone wrong on api call </div>}
 {!loading&&
 <div className="flex">
 <div className="m-4 border-r-2">
  <div>Filters</div>
  <div className="flex flex-col">
    <div>
      <select value={companyFilter} onChange={(e)=>handleCompanyChange("company",e.target.value)} 
       name="languages" className="m-2 p-2 rounded-xl border-[1px] border-gray-200" id="lang">
        <option value="select">Company</option>
        <option value="apple">Apple</option>
        <option value="samsung">Samsung</option>
        <option value="google">Google</option>

      </select>
    </div>
    <div>
      <select value={colorFilter} onChange={(e)=>handleColorChange("color",e.target.value)} 
       name="color" className="m-2 p-2 rounded-xl border-[1px] border-gray-200" id="lang">
        <option value="select">Color</option>
        <option value="red">Red</option>
        <option value="purple">Purple</option>
        <option value="white">White</option>
        <option value="brown">Brown</option>

      </select>
    </div>
    <div>
      <select value={priceFilter} onChange={(e)=>handlePriceChange("price",e.target.value)} 
       name="languages" className="m-2 p-2 rounded-xl border-[1px] border-gray-200" id="lang">
        <option value="select">Price Rage</option>
        <option value="250+">250+</option>
        <option value="500+">500+</option>
      </select>
    </div>
  </div>
 </div>
 <DataTable filterData={filterData} />
 </div>
 }
 </div>)
 
}

export default App
