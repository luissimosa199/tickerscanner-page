"use client";
import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import ItemCard from "./ItemCard";
import ItemCardSkeleton from "./ItemCardSkeleton";

const ItemsSection = () => {
  const { term, setTerm, results, isLoading } = useDebouncedSearch();

  return (
    <div className="p-4 mx-auto md:flex md:flex-wrap md:justify-center">
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
      <ul>
        {isLoading && <ItemCardSkeleton />}
        {!isLoading &&
          results &&
          results.map((e, idx: number) => {
            return (
              <ItemCard
                item={e}
                key={`${idx}_${"id"}`}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default ItemsSection;
