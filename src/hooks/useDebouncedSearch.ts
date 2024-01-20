import { SearchResultItem } from "@/types";
import { useState, useEffect, useRef } from "react";

const useDebouncedSearch = (initialTerm = "") => {
  const [term, setTerm] = useState(initialTerm);
  const [results, setResults] = useState<SearchResultItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const lastSearch = useRef(Date.now());

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`api/items?term=${term}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const delay = 1500;

    if (Date.now() - lastSearch.current > delay) {
      lastSearch.current = Date.now();
      fetchResults();
    } else {
      const timeoutId = setTimeout(() => {
        lastSearch.current = Date.now();
        fetchResults();
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  return { term, setTerm, results, isLoading };
};

export default useDebouncedSearch;
