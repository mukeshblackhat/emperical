import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataTable from './components/DataTable';
import Filters from './components/Filters';
import useFetch from './customeHooks/useFetch';

const App = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch('https://api.restful-api.dev/objects');
  
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
    <div className="flex flex-col min-h-screen font-[`Mona Sans,Helvetica Neue,Helvetica ,Arial,sans-serif`]">
       <div className="m-4 border-b-2">
      <div className="text-3xl mb-2 font-bold">Mobile World</div>
      <div className="mb-2 font-medium text-1 text-[#9f9f9f]">Currently we have <span className="font-bold text-[#232323]">{filterData.length}</span> items you can choose from .</div>
      </div>
      {error && (
        <div className="text-xl m-4 text-red-500 flex-1 center">
          Oops  api call can't be made , api limit reached
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-1  flex-col ">
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
