"use client";
import CustomMap from "@/components/cards/map/CustomMap";
import SearchSection, {
  RefDivCardSearch,
} from "@/components/cards/search/SearchSection";
import { selectCompany } from "@/lib/helpers/SearchCompanyHelper";
import { Company } from "@/redux/types/Companies";
import React, { createRef, useRef, useState } from "react";

function SearchPage() {
  const refSearchSection = createRef<RefDivCardSearch>();

  return (
    <main className="w-full max-h-[96vh] z-40 flex flex-col">
      <section></section>
      <section className="flex justify-between h-[93vh] relative overflow-hidden sm:flex-row flex-col">
        <SearchSection refSearch={refSearchSection} />
        <CustomMap
          callBackMarker={(company) => selectCompany(company, refSearchSection)}
        />
      </section>
    </main>
  );
}

export default SearchPage;
