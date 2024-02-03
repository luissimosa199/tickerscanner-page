import { SearchResultItem } from "@/types";
import { useState, useEffect, useRef } from "react";

const useDebouncedSearch = (initialTerm = "") => {
  const [term, setTerm] = useState(initialTerm);
  const [results, setResults] = useState<SearchResultItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const lastSearch = useRef(0); // Change to 0 to allow immediate search on input

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

    // Check if the term is not empty before triggering the initial search
    if (term && Date.now() - lastSearch.current >= delay) {
      lastSearch.current = Date.now();
      fetchResults();
    } else {
      const timeoutId = setTimeout(() => {
        // Check if the term is not empty before triggering the delayed search
        if (term) {
          lastSearch.current = Date.now();
          fetchResults();
        }
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  return { term, setTerm, results, isLoading };
};

export default useDebouncedSearch;
