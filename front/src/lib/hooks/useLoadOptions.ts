
import { Company } from '@/types/Company';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { useLazyGetCompaniesQuery } from '../services/companies';
import { Service } from '@/types/Service';
import { useLazyGetServicesQuery } from '../services/services';
import { useLazyGetAllStoresQuery } from '../services/stores';
import { Store } from '@/types/Store';
import { uniqByKeepLast } from '../utils';


type IProps = {} | undefined;

const useLoadOptions = () => {
  const [getCompaniesLazy] = useLazyGetCompaniesQuery();
  const [getServicesLazy] = useLazyGetServicesQuery();
  const [getStoresLazy] = useLazyGetAllStoresQuery();



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

  const loadCityStoresOptions = async (
    query: string,
    _: (option: OptionsOrGroups<Store, GroupBase<Store>>) => void
  ): Promise<Store[]> => {
    const response = await getStoresLazy({
      city: query,
    }).unwrap();

    return uniqByKeepLast(response['hydra:member'], 'city')
  };

  const loadServicesOptions = async (
    query: string,
    _: (option: OptionsOrGroups<Service, GroupBase<Service>>) => void
  ): Promise<Service[]> => {

    const response = await getServicesLazy({
      name: query,
    }).unwrap();

    return uniqByKeepLast(response['hydra:member'], 'name');
  };

  return {
    loadCompaniesOptions,
    loadServicesOptions,
    loadCityStoresOptions
  };
};

export default useLoadOptions;
