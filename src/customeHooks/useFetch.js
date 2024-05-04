import { useState, useEffect } from 'react';
import request from '../api/api';

/**
 * Custom hook to fetch data from a specified URL.
 *
 * @param {string} url The URL to fetch data from.
 * @returns An object containing the fetched data, loading status, and any error that occurred.
 */
const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    request
      .get(url)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    // Optional: Clean-up function if needed
    return () => {
      // Cancel the axios request here if component unmounts
    };
  }, [url]); // Dependency array contains url to refetch if url changes

  return { data, loading, error };
};

export default useFetch;
