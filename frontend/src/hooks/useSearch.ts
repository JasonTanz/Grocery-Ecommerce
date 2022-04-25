import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { findByKeywords } from '../graphql/product';
import { useLazyQuery } from '@apollo/client';
interface dataProps {
  product_name: string;
}
const useSearch = () => {
  const [filteredData, setFilteredData] = useState<dataProps[]>([]);
  const [searchWords, setSearchWords] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchWords, 500);

  const [getKeywords, { loading, error, data, refetch }] = useLazyQuery(
    findByKeywords,
    {
      variables: { keywords: debouncedSearchTerm },
    },
  );

  useEffect(() => {
    if (data) {
      setFilteredData([...data.searchProductByKeyword]);
    }
    if (error) {
      setFilteredData([]);
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getKeywords();
    } else {
      setFilteredData([]);
    }
  }, [debouncedSearchTerm, getKeywords, refetch]);

  return { loading, searchWords, filteredData, setSearchWords };
};

export default useSearch;
