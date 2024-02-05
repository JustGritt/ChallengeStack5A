

import { RefDivCardSearch } from "@/components/cards/search/SearchSection";
import { Company } from "@/types/Company";

export async function selectCompany(search: Company, ref: React.RefObject<RefDivCardSearch>): Promise<void> {
    if (ref.current) {
        ref.current.scrollIntoView?.(search.name);
    }
}
