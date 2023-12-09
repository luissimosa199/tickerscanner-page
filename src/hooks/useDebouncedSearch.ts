import { SearchResultItem } from "@/types";
import { useState, useEffect } from "react";

const useDebouncedSearch = (initialTerm = "") => {
  const [term, setTerm] = useState(initialTerm);
  const [debouncedTerm, setDebouncedTerm] = useState(initialTerm);
  const [results, setResults] = useState<SearchResultItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delay = 1000;

    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`api/items?term=${debouncedTerm}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedTerm) {
      fetchResults();
    } else {
      setResults(null);
    }
  }, [debouncedTerm]);

  return { term, setTerm, results, isLoading };
};

export default useDebouncedSearch;
