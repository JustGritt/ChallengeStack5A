import CustomMap from "@/components/cards/map/CustomMap";
import SearchSection from "@/components/cards/search/SearchSection";
import React from "react";

function SearchPage() {
  return (
    <main className="w-full max-h-[96vh] z-40 flex flex-col">
      <section></section>
      <section className="flex justify-between h-full flex-1 relative overflow-hidden">
        <SearchSection />
        <CustomMap />
      </section>
    </main>
  );
}

export default SearchPage;
