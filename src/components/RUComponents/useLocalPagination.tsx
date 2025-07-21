import { db } from "@/src/db/connection";
import { useCallback, useEffect, useState } from "react";

interface UsePaginationProps {
  search?: string; // changed from "query" to "search"
  page?: number;
  limit?: number;
  fetchNumber?: number;
  revalidateKey?: string;
  tableName: string;
  sortByOrder?: "asc" | "desc";
}

export const usePagination = ({
  tableName,
  search = "",
  page = 1,
  limit = 10,
  fetchNumber = Infinity,
  revalidateKey = "",
  sortByOrder = "desc",
}: UsePaginationProps) => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [totalResult, setTotalResult] = useState(0);
  const [pageNo, setPageNo] = useState(page);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Helper to safely escape search input
  const escapeSearch = (input: string) => {
    return input.replace(/'/g, "''"); // escape single quotes
  };

  const buildQuery = (pageNo: number) => {
    const offset = (pageNo - 1) * limit;
    const escapedSearch = escapeSearch(search.trim());
    const whereClause = escapedSearch
      ? `WHERE name LIKE '%${escapedSearch}%'`
      : "";

    const orderClause = `ORDER BY id ${sortByOrder.toUpperCase()}`;

    return {
      dataQuery: `SELECT * FROM ${tableName} ${whereClause} ${orderClause} LIMIT ${limit} OFFSET ${offset}`,
      countQuery: `SELECT COUNT(*) as total FROM ${tableName} ${whereClause}`,
    };
  };

  const fetchData = async (requestedPage: number, isRefresh = false) => {
    try {
      const { dataQuery, countQuery } = buildQuery(requestedPage);
      const newData = await db.getAllAsync<any>(dataQuery);
      const countResult = await db.getAllAsync<any>(countQuery);
      const total = countResult?.[0]?.total || 0;

      setData((prevData) => {
        const combined = isRefresh ? newData : [...prevData, ...newData];
        const cappedData = combined.slice(0, fetchNumber);

        setTotalResult(total);
        setPageNo(requestedPage);
        setHasMore(
          cappedData.length < total &&
            newData.length === limit &&
            cappedData.length < fetchNumber
        );

        return cappedData;
      });
    } catch (error) {
      console.error("Error fetching local data:", error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
      setInitialLoader(false);
    }
  };

  useEffect(() => {
    fetchData(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, revalidateKey]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setHasMore(true);
    fetchData(1, true);
  }, [search]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      fetchData(pageNo + 1);
    }
  }, [loadingMore, hasMore, pageNo]);

  return {
    data,
    totalResult,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
    hasMore,
    setData,
    revalidateKey,
  };
};
