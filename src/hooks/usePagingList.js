import { useCallback, useEffect, useState } from "react";

const usePagingList = (request) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const getList = useCallback(async () => {
    const res = await request({ page, size });
    setList(res.list);
    setTotal(res.total);
  }, [request, page, size]);

  useEffect(() => {
    getList(page, size);
  }, [page, size, getList]);

  return {
    page,
    size,
    list,
    total,
    setList,
    getList,
    setPage,
    setSize,
  };
};

export default usePagingList;
