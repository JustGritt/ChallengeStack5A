"use client";
import SearchSection from "@/components/cards/Search/SearchSection";
import CustomMap from "@/components/cards/map/CustomMap";

import { selectCompany } from "@/lib/helpers/SearchStoreHelper";
import { RefDivCardSearch } from "@/types/ScrollDiv";
import { Store } from "@/types/Store";
import React, { createRef } from "react";



function SearchPage() {
  const refSearchSection = createRef<RefDivCardSearch>();
  const [stores, setStores] = React.useState<Store[]>([]);

  return (
    <main className="w-full max-h-[96vh] z-40 flex flex-col">
      <section className="flex justify-between h-[93vh] relative overflow-hidden sm:flex-row flex-col">
        <SearchSection
          refSearch={refSearchSection}
          callBack={(stores) => {
            setStores(stores);
          }}
        />
        <CustomMap
          stores={stores}
          callBackMarker={(store) => selectCompany(store, refSearchSection)}
        />
      </section>
    </main>
  );
}

export default SearchPage;
