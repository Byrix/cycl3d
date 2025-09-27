import { Icon } from "@iconify/react";
import { data } from "$/shared/data.store";
import Fieldset from "./Fieldset";

type Sig = typeof data.buildings;

const DataFilters = () => {
  return (
    <Fieldset title="Data filters" help="filters">
      <div class="grid grid-cols-2 !gap-[1px] rounded-xl overflow-hidden md:grid-cols-2 lg:grid-cols-3 border border-neutral bg-neutral items-center">
        {/* <FilterButton label="Roads" icon="material-symbols:road-rounded" /> */}
        <FilterButton
          label="Buildings"
          icon="material-symbols:location-city-rounded"
          sig={data.buildings}
        />
        <FilterButton
          label="Trees"
          icon="material-symbols:nature-rounded"
          sig={data.trees}
        />
      </div>
    </Fieldset>
  );
};

const FilterButton = ({
  label,
  icon,
  sig,
}: {
  label: string;
  icon: string;
  sig: Sig;
}) => {
  return (
    <label
      class={`p-4 btn btn-soft rounded-none border-none swap !aspect-square w-full h-fit ${sig.show ? "bg-base-100" : "bg-base-200"}`}
    >
      <input
        type="checkbox"
        checked={sig.show}
        onClick={() => {
          sig.show = !sig.show;
        }}
      />
      <Icon
        icon={icon}
        className={`size-9 lg:size-12 xl:size-16 ${sig.show || "mask-slashed text-neutral"}`}
      />
    </label>
  );
};

export default DataFilters;
