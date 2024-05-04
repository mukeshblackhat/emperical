import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataTable from './components/DataTable';
import Filters from './components/Filters';
import useFetch from './customeHooks/useFetch';
import { API_ROUTES } from './api/client';

const App = () => {
  console.log("rendering APP")
  const {
    data: products,
    loading,
    error,
  } = useFetch(API_ROUTES.product.getAllProducts);
  
  let [searchParams, setSearchParams] = useSearchParams();

  // Initialize filterTags from URL parameters or default to empty strings
  const [filterTags, setFilterTags] = useState({
    company: searchParams.get('company') || '',
    color: searchParams.get('color') || '',
    price: searchParams.get('price') || '',
  });

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (!products) return; // Ensure products are defined
    let filteredProducts = products.filter(product => {
      const productName = product?.name?.toLowerCase() || '';
      const productColor = product?.data?.color?.toLowerCase() || '';
      const productPrice = product?.data?.price;

      return (
        (!filterTags.company ||
          filterTags.company === 'all' ||
          productName.includes(filterTags.company.toLowerCase())) &&
        (!filterTags.color ||
          filterTags.color === 'all' ||
          productColor === filterTags.color.toLowerCase()) &&
        (!filterTags.price ||
          filterTags.price === 'all' ||
          productPrice >= parseInt(filterTags.price, 10))
      );
    });
    setFilterData(filteredProducts);
  }, [filterTags, products]);

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = { ...filterTags, [filterName]: value };
    setFilterTags(updatedFilters);
    // Update URL search parameters
    const newQueryParams = new URLSearchParams(searchParams);
    newQueryParams.set(filterName, value);
    setSearchParams(newQueryParams.toString());
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex bg-gray-200 p-5 ">Mobile Bar</div>
      {error && (
        <div className="text-xl m-4 text-red-500 flex-1 center">
          Oops something went wrong on api call
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-1">
          <Filters
            filterTags={filterTags}
            handleFilterChange={handleFilterChange}
          />
          <DataTable filterData={filterData} />
        </div>
      )}
    </div>
  );
};

export default App;
