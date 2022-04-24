import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
// import { useFetchServiceByKeyword } from '../api/service.api';

const useSearch = () => {
  const [filteredData, setFilteredData] = useState<any>([]);
  const [searchWords, setSearchWords] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchWords, 500);
  // change this
  const loading = true;
  // eslint-disable-next-line no-unused-vars
  //   const { loading, fetch } = useFetchServiceByKeyword(
  //     debouncedSearchTerm,
  //     (err: any, res: any) => {
  //       if (err) {
  //         setFilteredData([]);
  //       } else if (res) {
  //         setFilteredData(res.data);
  //       }
  //     },
  //   );

  useEffect(() => {
    if (debouncedSearchTerm) {
      //   fetch();
    } else {
      setFilteredData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return { loading, searchWords, filteredData, setSearchWords };
};

export default useSearch;
