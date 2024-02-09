"use client";
import StoreCard from "@/components/Pages/Store/StoreCard";
import { CITIES } from "@/lib/constants/fakeDatas";

import { ApiSuccessBase } from "@/types/ApiBase";
import { Company } from "@/types/Company";
import { useSearchParams } from "next/navigation";
import { QueryStore, Store } from "@/types/Store";
import React, {
  ForwardRefRenderFunction,
  LegacyRef,
  Ref,
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Button } from "@/components/Ui/Button";
import { useLazyGetAllStoresQuery } from "@/lib/services/stores";

export type RefDivCardSearch = {
  scrollIntoView?: (name: string) => void;
};

type SearchSectionProps = {
  refSearch?: Ref<RefDivCardSearch>;
  callBack: (store: Store[]) => void;
};

const SearchSection: ForwardRefRenderFunction<
  RefDivCardSearch,
  SearchSectionProps
> = ({ refSearch, callBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const domainSearch = searchParams?.get("domainSearch");
  const location = searchParams?.get("location");

  const [currentStore, setCurrentStore] = React.useState<Store | undefined>(
    undefined
  );
  const [getAllStores, { isLoading, data: storesData, isError }] =
    useLazyGetAllStoresQuery();

  const inputRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => {
    return storesData
      ? Array.from({ length: storesData?.["hydra:member"].length ?? 0 }, () =>
          createRef()
        )
      : [];
  }, [storesData?.["hydra:member"]?.length]);

  useImperativeHandle(refSearch, () => {
    return {
      scrollIntoView: (name) => {
        const storeIndex = inputRefs.findIndex((ref) => {
          return ref.current?.id === name;
        });
        //inputRefs[storeIndex].current?.scrollIntoView({ behavior: "smooth" });
        if (containerRef.current && inputRefs[storeIndex]?.current) {
          const container = containerRef.current;
          const targetDiv = inputRefs[storeIndex].current;
          const targetDivOffsetTop = targetDiv?.offsetTop;
          const containerOffsetTop = container.offsetTop;

          setCurrentStore(storesData?.["hydra:member"][storeIndex]);
          container.scroll({
            top: (targetDivOffsetTop ?? 0) - containerOffsetTop,
            left: 0,
            behavior: "smooth",
          });
        }
      },
    };
  });

  // check if last element is in view
  useEffect(() => {
    const params: Partial<QueryStore> = {};
    if (domainSearch || location) {
      params["services.name"] = domainSearch ?? undefined;
      params.city = location ?? undefined;
    }
    getAllStores(params)
      .unwrap()
      .then((res) => {
        if (res) {
          const allStores = res["hydra:member"] as Store[];
          callBack(allStores);
        }
      });
  }, [domainSearch, location]);

  return (
    <aside
      className="flex-1 bg-white dark:bg-slate-500 max-h-full overflow-y-scroll"
      ref={containerRef}
    >
      <div className="p-4 bg-slate-400">
        <h2 className="text-xl text-white font-bold">Trouvez votre magasin</h2>
        <p className="text-sm font-inter font-thin text-white ">
          Sélectionnez le magasin qui vous convient
        </p>
      </div>
      {isLoading && !isError ? (
        <h1>Loading</h1>
      ) : (
        storesData !== undefined && (
          <>
            <div className="flex flex-col pb-10">
              {storesData["hydra:member"]?.map((store, i) => (
                <StoreCard
                  active={currentStore?.name === store?.name}
                  store={store}
                  key={store.id}
                  refStore={inputRefs[i]}
                />
              ))}
            </div>
            {storesData["hydra:member"].length <= 5 && (
              <div className="w-full flex justify-center ">
                <Button
                  onClick={() => {
                    getAllStores()
                      .unwrap()
                      .then((res) => {
                        if (res) {
                          const allStores = res["hydra:member"] as Store[];
                          callBack(allStores);
                        }
                      });
                  }}
                >
                  Charger tous...
                </Button>
              </div>
            )}
          </>
        )
      )}
    </aside>
  );
};

export default forwardRef(SearchSection);
