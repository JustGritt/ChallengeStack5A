import ReactSelect, { GroupBase, OptionsOrGroups } from "react-select";
import { StateManagerProps } from "../../../node_modules/react-select/dist/declarations/src/stateManager";
import AsyncSelect from "../../../node_modules/react-select/dist/declarations/src/Async";
import { cn } from "@/lib/utils";
import RSelectAsync from "react-select/async";

interface Option {
  label: string;
  value?: string | number;
  options?: Option[];
  [key: string]: any;
}

interface Props extends StateManagerProps {
  options?: OptionsOrGroups<Option, GroupBase<Option>> | undefined;
  isMulti?: boolean;
  label: string;
  isSearchable?: boolean;
}
export const SelectField: React.FC<Props> = (props) => {
  const { options, isMulti, isSearchable } = props;

  return (
    <ReactSelect
      {...props}
      isMulti={isMulti}
      unstyled={true}
      isSearchable={isSearchable}
      hideSelectedOptions={true}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      classNames={{
        control: (e) =>
          cn(
            `rounded-md border`,
            `border-input px-3 py-1 text-sm`,
            e.isFocused ? "ring-1 ring-ring" : ""
          ),
        indicatorSeparator: () => "bg-gray-100 mx-2",
        dropdownIndicator: () => "text-gray-400",
        menu: () =>
          cn(
            "absolute top-0 mt-1 text-sm z-10 w-full",
            "rounded-md border bg-popover shadow-md overflow-x-hidden"
          ),
        option: () =>
          cn(
            "cursor-default",
            "rounded-sm py-1.5 m-1 px-2 text-sm outline-none",
            "focus:bg-gray-200 hover:bg-gray-200 w-auto"
          ),
        noOptionsMessage: () => "p-5",
        multiValue: () => "bg-gray-200 px-2 p-1 rounded mr-2",
        input: () => "text-sm overflow-x-hidden",
      }}
      options={options}
    />
  );
};

export const AsyncSelectComponent: AsyncSelect = (props) => {
  return (
    <RSelectAsync
      classNames={{
        control: (e) =>
          cn(
            `rounded-md border`,
            `border-input px-3 py-1 text-sm`,
            e.isFocused ? "ring-1 ring-ring" : ""
          ),
        indicatorSeparator: () => "bg-gray-100 mx-2",
        dropdownIndicator: () => "text-gray-400",
        menu: () =>
          cn(
            "absolute top-0 mt-1 text-sm z-10 w-full",
            "rounded-md border bg-popover shadow-md overflow-x-hidden"
          ),
        option: () =>
          cn(
            "cursor-default",
            "rounded-sm py-1.5 m-1 px-2 text-sm outline-none",
            "focus:bg-gray-200 hover:bg-gray-200 w-auto"
          ),
        noOptionsMessage: () => "p-5",
        multiValue: () => "bg-gray-200 px-2 p-1 rounded mr-2",
        input: () => "text-sm overflow-x-hidden",
      }}
      placeholder="Choisir..."
      noOptionsMessage={() => "Pas de donnée(s) trouvée(s)"}
      loadingMessage={() => "Chargement..."}
      closeMenuOnSelect={false}
      {...props}
    />
  );
};
