

import { RefDivCardSearch } from "@/components/cards/search/SearchSection";
import { Store } from "@/types/Store";

export async function selectCompany(search: Store, ref: React.RefObject<RefDivCardSearch>): Promise<void> {
    if (ref.current) {
        ref.current.scrollIntoView?.(search.name);
    }
}