import { useState, useEffect } from 'react';

const useFetch = (service, defaultFilter, defaultValue = {}) => {
  const [data, setData] = useState(defaultValue);
  const [dataCNX, setDataCNX] = useState(defaultValue);

  const [loading, setLoading] = useState(true);
  const [filter, setStateFilter] = useState(defaultFilter);

  const fecthService = filter => {
    setLoading(true);
    service(filter)
      .then(data => {
        setData(data);
        setDataCNX(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fecthService(filter);
  }, []);

  const clearData = () => {
    setData({});
    setDataCNX({});
  };

  const setFilter = (updateFilter, isNotRefetch = false) => {
    if (typeof updateFilter === 'object') {
      setStateFilter({
        ...filter,
        ...updateFilter
      });

      if (!isNotRefetch) {
        fecthService({
          ...filter,
          ...updateFilter
        });
      }
    } else {
      console.warn(
        `setFilter accpet only object, but you provide ${typeof updateFilter}`
      );
    }
  };

  return {
    data,
    loading,
    setData,
    setDataCNX,
    dataCNX,
    clearData,
    setLoading,
    setFilter,
    filter,
    reload: () => fecthService(filter)
  };
};

export default useFetch;
