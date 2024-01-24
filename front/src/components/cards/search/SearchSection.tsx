import ServiceCard from "@/components/Services/ServiceCard";
import React from "react";

function SearchSection() {
  return (
<aside className="flex-1 bg-gray-500 max-h-full overflow-y-scroll">
      <div className="p-4">
        <h2 className="text-xl text-white font-bold">Trouvez votre service</h2>
        <p className="text-sm font-inter font-thin text-white ">
          Sélectionnez votre service qui vous convient
        </p>
      </div>
      <div className="flex flex-col ">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </aside>
  );
}

export default SearchSection;
