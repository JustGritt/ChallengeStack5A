"use client";
import StoreCard from "@/components/Store/StoreCard";
import { CITIES } from "@/lib/constants/fakeDatas";
import { Company } from "@/types/Company";
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

export type RefDivCardSearch = {
  scrollIntoView?: (name: string) => void;
};

type SearchSectionProps = {
  refSearch?: Ref<RefDivCardSearch>;
};

const SearchSection: ForwardRefRenderFunction<
  RefDivCardSearch,
  SearchSectionProps
> = ({ refSearch }) => {
  const allStore = CITIES;
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStore, setCurrentStore] = React.useState<Company | undefined>(
    undefined
  );
  const inputRefs: React.RefObject<HTMLDivElement>[] = useMemo(
    () =>
      Array(allStore.length)
        .fill(null)
        .map((i) => React.createRef()),
    []
  );

  useImperativeHandle(refSearch, () => {
    return {
      scrollIntoView: (name) => {
        const storeIndex = inputRefs.findIndex((ref) => {
          return ref.current?.id === name;
        });
        //inputRefs[storeIndex].current?.scrollIntoView({ behavior: "smooth" });
        if (containerRef.current && inputRefs[storeIndex].current) {
          const container = containerRef.current;
          const targetDiv = inputRefs[storeIndex].current;
          const targetDivOffsetTop = targetDiv?.offsetTop;
          const containerOffsetTop = container.offsetTop;
          setCurrentStore(allStore[storeIndex] as any);
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
    document?.body.classList.add("overflow-y-hidden");

    return () => {
      document?.body.classList.add("overflow-y-auto");
    };
  }, [inputRefs]);

  return (
    <aside
      className="flex-1 bg-white max-h-full overflow-y-scroll"
      ref={containerRef}
    >
      <div className="p-4 bg-slate-400">
        <h2 className="text-xl text-white font-bold">Trouvez votre magasin</h2>
        <p className="text-sm font-inter font-thin text-white ">
          Sélectionnez le magasin qui vous convient
        </p>
      </div>
      <div className="flex flex-col pb-10 gap-2">
        {allStore.map((store, i) => (
          <StoreCard
            active={currentStore?.name === store?.name}
            store={store}
            key={store.name}
            refStore={inputRefs[i]}
          />
        ))}
      </div>
    </aside>
  );
};

export default forwardRef(SearchSection);
