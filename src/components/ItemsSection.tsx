"use client";
import React, { useEffect, useState } from "react";

const ItemsSection = () => {
  const [term, setTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");
  const [results, setResults] = useState<any[] | null>(null);

  useEffect(() => {
    const delay = 300;

    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`api/items?term=${debouncedTerm}`);
      const data = await response.json();
      console.log(data);
      setResults(data);
    })();
  }, [debouncedTerm]);

  return (
    <div>
      <ul className="p-4 mx-auto md:flex md:flex-wrap md:justify-center">
        <div>
          <input
            type="text"
            className="shadow-md border-gray-100 border w-full rounded-full px-4 py-2"
            placeholder="Buscar item por nombre"
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            value={term}
          />
        </div>
        {results &&
          results.map((result: any, idx: number) => {
            return <p key={`${idx}_${"id"}`}>{JSON.stringify(result)}</p>;
          })}
      </ul>
    </div>
  );
};

export default ItemsSection;
