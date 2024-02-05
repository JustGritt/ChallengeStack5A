
import { Company } from '@/types/Company';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { useLazyGetCompaniesQuery } from '../services/companies';


type IProps = {} | undefined;

const useLoadOptions = () => {
  const [getCompaniesLazy] = useLazyGetCompaniesQuery();



  const loadCompaniesOptions = async (
    query: string,
    _: OptionsOrGroups<Company, GroupBase<Company>>
  ) => {
    const response = await getCompaniesLazy({
      query,
    }).unwrap();

    return {
      options: response['hydra:member'].map((company) => ({
        label: company.name,
        value: company.id,
      })),
    };
  };

  return {
    loadCompaniesOptions,
  };
};

export default useLoadOptions;
