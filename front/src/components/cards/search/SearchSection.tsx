import StoreCard from "@/components/Store/StoreCard";
import React from "react";

function SearchSection() {
  return (
<aside className="flex-1 bg-gray-500 max-h-full overflow-y-scroll">
      <div className="p-4">
        <h2 className="text-xl text-white font-bold">Trouvez votre magasin</h2>
        <p className="text-sm font-inter font-thin text-white ">
          Sélectionnez le magasin qui vous convient
        </p>
      </div>
      <div className="flex flex-col ">
        <StoreCard />
        <StoreCard />
        <StoreCard />
      </div>
    </aside>
  );
}

export default SearchSection;
