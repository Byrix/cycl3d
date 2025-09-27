import { Icon } from "@iconify/react";
import { DataAttribution, DataFilter, Geocoder } from "./widgets";

const Sidebar = () => {
  return (
    <div class="w-1/5 h-full max-h-[89vh] bg-base-200 min-w-50 flex flex-col p-4 gap-3 items-center border-y-2 border-base-300 overflow-scroll">
      <h3 class="text-primary text-2xl font-bold text-center">Sidebar</h3>
      <p class="text-center">Description</p>

      <div class="divider m-[0.5rem]">
        <Icon
          icon="material-symbols:directions-bike-rounded"
          className="size-10 opacity-20"
        />
      </div>

      <Geocoder />
      <DataFilter />

      <div class="grow shrink" />

      <DataAttribution />
    </div>
  );
};

export default Sidebar;
